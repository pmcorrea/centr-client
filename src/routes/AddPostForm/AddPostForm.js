import React, { Component } from 'react'
import './AddPostForm.css'
import MainContext from '../../contexts/MainContext';
import AuthApiService from "../../services/auth-api-service.js"


export default class AddPostForm extends Component {
  static contextType = MainContext;

  constructor(props) {
  super(props);
  this.state = {
		folder_id: null,
		post_name: '',
		modified: this.makeDate(),
		content: '',
		touched: false,
		error: null,
		visibility: 'Private',
		user_name: null,
		avatar: null
  }
}

componentDidMount() {
    this.setCurrentUser()
  }

  setCurrentUser() {
	AuthApiService.getCurrentUserDetailsById()
	.then(currentUser => {
		let avatar = currentUser[0]['avatar']
		currentUser = currentUser[0]

		this.setState({
			user_name: currentUser,
			avatar: avatar
		})
	})
	.catch(error => {
		this.setState({ error }, () => console.log(this.state.error))
	})
}
	makeDate() {
		let date = new Date()
		return date.toLocaleString()
	}

	updatePostVisibility(input) {
		this.setState({
			visibility: input,
		});
	}

  updatePostName(input) {
	  this.setState({
		  post_name: input,
	  });
  }

  updateFolderId(input) {
	  if (!this.state.touched) {
		this.setState({
			folder_id: input,
			touched: true
		});
	  }
	
}

  updatePostContent(input) {
		this.setState({
			content: input
		});
	}
	 
  updatePostFolder(input, folders) {
	  const singleFolder = folders.find(folder => folder.folder_name === input)
	  this.setState({
		folder_id: singleFolder.id, 
	  });
  }

  handleSubmit(event) {
	  event.preventDefault();
	  const post = this.state;

		AuthApiService.postPost(post)
			.then(result => {
			this.context.getDataWithToken()
			this.props.history.goBack()
		})
		.catch(error => 
			error => this.setState({error})
		) 

}

	validateSubmission() {
		const postName = this.state.post_name
		const postContent = this.state.content

		if (
				((postName.trim().length < 3) ||
				(postName.length < 3)
				) 
				||
				(postContent.length < 3)
			)
			{
			return true
		}
	}

	randomKey() {
		return Math.random().toString(36).substr(2, 9);
	}

  render() {
	const { error } = this.state;
	const {folders=[]} = this.context;
	let firstFolder = folders[0]
	let firstFolderId;
	  
	if (firstFolder) {
		firstFolderId = firstFolder['id']
	}
	
	return folders 
		? (<>
			<div role="alert">{error && <p>{error}</p>}</div>
			
			<div className="AddPost__form_contaner">
				<form onSubmit={e => this.handleSubmit(e)} className="AddPost__form">
					{/* <label htmlFor="post_input_field" id="folder_select_menu_label">post title</label> */}
					<input className="AddPost__input" placeholder="post title" 
						id='post_input_field' type='text' onChange={e => {
							this.updatePostName(e.target.value)
							this.updateFolderId(firstFolderId)
						}}></input>

					<label htmlFor="folder_select_menu" id="folder_select_menu_label">select folder</label>
					<select className="AddPost__select" id='folder_select_menu' onChange={e => this.updatePostFolder(e.target.value, folders)}>
						{folders.map(folder => (
							<option className="AddPost__option" value={folder.folder_name} 
								key={`folder.folder_name_${this.randomKey()}`}>{folder.folder_name}</option>
						))}
					</select>

					<label htmlFor="post_visibility_option" id="folder_select_menu_label">select visibility</label>
					<select className="AddPost__select" id='post_visibility_option' onChange={e => this.updatePostVisibility(e.target.value, folders)}>
							<option className="AddPost__option" value='Private' key={'Private'}>Private</option>
							<option className="AddPost__option" value='Public' key={'Public'}>Public</option>
					</select>

					<textarea className="AddPost__textarea" placeholder="add some content..." 
						id='content_area' type='text' 
						onChange={e => this.updatePostContent(e.target.value)}></textarea>
						
					<button className="AddPost__button" type='submit' 
						disabled={this.validateSubmission() }>submit</button>
				</form>
			</div>
		</>) 
		: ('');
	}
}