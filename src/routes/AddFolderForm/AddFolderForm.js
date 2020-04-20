import React, { Component } from 'react'
import './AddFolderForm.css'
import MainContext from '../../contexts/MainContext';
import AuthApiService from "../../services/auth-api-service.js"


export default class AddFolderForm extends Component {
  static contextType = MainContext;

	constructor(props) {
    super(props);
	this.state = {
		folder_name: '',
    }
  }

	updateFolderName(input) {
		this.setState({
			folder_name: input,
		});
	}

	handleSubmit(event) {
    	event.preventDefault();
		const folder  = this.state;

		AuthApiService.postFolder(folder)
			.then(result => {
			this.context.getDataWithToken()
			this.props.history.goBack()
		})
		.catch(error => 
			error => this.setState({error})
		) 
	}

	validateLength() {
		const folderName = this.state.name

		if (this.state.name.trim().length === 0) {
			return 'Name can not be blank'
		}

		if (folderName.length === 0) {
			return 'Name can not be blank'
		}

		if ((folderName.length < 3)&&(folderName.length > 0)) {
			return 'Name must be longer than 3 characters'
		}
	}

	validateExistingName() {
		const folderName = this.state.name
		const folders = this.context.folders.map(folder => folder.name)

		if (folders.find(folder => folder === folderName)) {
			return 'Folder name already exists'
		}
	}
  
	render() {  
		return (
			<>
				<div className="AddFolder__form_container">
					<form className="AddFolder__form" onSubmit={e => this.handleSubmit(e)}>
					<input className="AddFolder__input" 
						id='post_input_field' 
						type='text' 
						placeholder="folder title" 
						onChange={e => this.updateFolderName(e.target.value)}></input>
						
					<button className="AddFolder__button" type='submit'>submit</button>
					</form>
				</div>
			</>
		)
	}
}
