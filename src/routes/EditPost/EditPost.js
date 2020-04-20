import React, { Component } from 'react'
import './EditPost.css'
import MainContext from '../../contexts/MainContext';
import AuthApiService from "../../services/auth-api-service.js"


export default class EditPost extends Component {
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
			postIdToEdit: ''
		}
	}

	retrievePostToEdit() {
		let {postId} = this.props.match.params

		let async = async () => {
			let postToEdit = await AuthApiService.getPostToEdit(postId)
			postToEdit = postToEdit[0]

			let { content, post_name, id, folder_id} = postToEdit

			if (!this.state.touch) {
				this.setState({
					post_name: post_name,
					content: content,
					postIdToEdit: id,
					folder_id: folder_id
				})
			}		
		}
		async()

	}

	componentDidMount() {
		this.setCurrentUser()
		this.retrievePostToEdit()
	}

	setCurrentUser() {
	AuthApiService.getCurrentUserDetailsById()
	.then(currentUser => {
		currentUser = currentUser[0]

		this.setState({
			user_name: currentUser
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
			touch: true
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
				content: input,
				touch: true
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

			AuthApiService.updatePost(post)
				.then(result => {
				this.context.getDataWithToken()
				this.props.history.push('/')
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
	const {folders} = this.context;
	let firstFolder = folders[0]
	let firstFolderId;
	  
	if (firstFolder) {
		firstFolderId = firstFolder['id']
	}
	
	  return folders ? (
		<>
		<div role="alert">{error && <p>{error}</p>}</div>
		<div className="EditPost__form_container">
			<form onSubmit={e => this.handleSubmit(e)} className="EditPost__form">
				<input className="EditPost__input" id='post_input_field' type='text' value={this.state.post_name} onChange={e => {
					this.updatePostName(e.target.value)
					this.updateFolderId(firstFolderId)
					}}></input>
				
				<select className="EditPost__select" id='folder_select_menu' onChange={e => this.updatePostFolder(e.target.value, folders)}>
					{folders.map(folder => (
						<option className="EditPost__option" value={folder.folder_name} key={`folder.folder_name_${this.randomKey()}`}>{folder.folder_name}</option>
					))}
				</select>

				<textarea className="EditPost__textarea" id='content_area' type='text' value={this.state.content} onChange={e => this.updatePostContent(e.target.value)}></textarea>
				
				<select className="EditPost__select" id='post_visibility_option' onChange={e => this.updatePostVisibility(e.target.value, folders)}>
						<option className="EditPost__option" value='Private' key={'Private'}>Private</option>
						<option className="EditPost__option" value='Public' key={'Public'}>Public</option>
				</select>

				<button className="EditPost__button" type='submit' disabled={
						this.validateSubmission() }>Submit</button>
			</form>
		</div>
		</>

	  ) : ('');
	}
}