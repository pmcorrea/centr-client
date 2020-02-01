import React, { Component } from 'react'
import './AddNoteForm.css'
import MainContext from '../../contexts/MainContext';
import config from '../../config'
import TokenHelpers from '../../services/token-helpers'

export default class AddNoteForm extends Component {
  static contextType = MainContext;

  constructor(props) {
  super(props);
  this.state = {
		folder_id: null,
		note_name: '',
		modified: this.makeDate(),
		content: '',
		touched: false,
		error: null
  }
}
	makeDate() {
		let date = new Date()
		return date.toLocaleString()
	}

  updateNoteName(input) {
	  this.setState({
		  note_name: input,
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

  updateNoteContent(input) {
		this.setState({
			content: input
		});
	}
	 
  updateNoteFolder(input, folders) {
	  const singleFolder = folders.find(folder => folder.folder_name === input)
	  this.setState({
		folder_id: singleFolder.id, 
	  });
  }

  handleSubmit(event) {
	  event.preventDefault();
	  const note = this.state;

	  fetch(`${config.API_ENDPOINT}/notes`, {
		method: 'POST',
		headers: {
				'content-type': 'application/json',
				'authorization': `bearer ${TokenHelpers.getAuthToken()}`,
		},
		body: JSON.stringify({
			note
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
			this.context.addNote(result[0]);
		})
		.then(this.props.history.push('/'))
		.catch(error => this.setState({error}))
}

	validateSubmission() {
		const noteName = this.state.note_name
		const noteContent = this.state.content

		if (
				((noteName.trim().length < 3) ||
				(noteName.length < 3)
				) 
				||
				(noteContent.length < 3)
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
		<div role="alert">{error && <p className="red">{error}</p>}</div>
		  <form onSubmit={e => this.handleSubmit(e)} className={['Noteful-form'].join(' ')}>
			  <label htmlFor='note_input_field'>Name</label>
			  <input id='note_input_field' type='text' onChange={e => {
				  this.updateNoteName(e.target.value)
				  this.updateFolderId(firstFolderId)
				  }}></input>
			

			  <label htmlFor='folder_select_menu'>Folder</label>
			  <select id='folder_select_menu' onChange={e => this.updateNoteFolder(e.target.value, folders)}>
				  {folders.map(folder => (
					  <option value={folder.folder_name} key={`folder.folder_name_${this.randomKey()}`}>{folder.folder_name}</option>
				  ))}
			  </select>

			  <label htmlFor='content_area'>Content</label>
			  <textarea id='content_area' type='text' onChange={e => this.updateNoteContent(e.target.value)}></textarea>
			  

			  <button type='submit' disabled={
					  this.validateSubmission() }>Submit</button>
		  </form>
		  </>

	  ) : ('');
	}
}