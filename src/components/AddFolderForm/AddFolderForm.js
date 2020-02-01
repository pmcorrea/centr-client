import React, { Component } from 'react'
import './AddFolderForm.css'
import MainContext from '../../contexts/MainContext';
import config from '../../config'
import TokenHelpers from '../../services/token-helpers'

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

		fetch(`${config.API_ENDPOINT}/folders`, {
			method: 'POST',
			headers: {
					'content-type': 'application/json',
					'authorization': `bearer ${TokenHelpers.getAuthToken()}`,
			},
			body: JSON.stringify({
				folder
			})
		})
		.then(response => {
			if (!response.ok) {
				throw new Error(response.status)
			}
			return response.json()
		})
		.then(result => {
			// return full folder details and insert into context
			this.context.addFolder(result[0]);
		})
		.then(this.props.history.push('/'))
		.catch(error => this.setState({error}))
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
  
  render(){  
    return (
    <>
    
      <form className={['Noteful-form'].join(' ')} onSubmit={e => this.handleSubmit(e)}>
        <label htmlFor='note_input_field'>Folder Name</label>
        <input id='note_input_field' type='text' onChange={e => this.updateFolderName(e.target.value)}></input>

        <button type='submit'>Submit</button>
      </form>
    </>
  )
  }
  
}
