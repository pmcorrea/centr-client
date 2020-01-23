import React, { Component } from 'react'
import './AddNoteForm.css'
import {MainContext} from '../MainContext.js'

export default class AddNoteForm extends Component {
  static contextType = MainContext;

  constructor(props) {
  super(props);
  this.state = {
	  	id: '',
		note_id: Math.random().toString(36).substr(2, 9),
		note_name: "",
		modified: "2019-01-03T00:00:00.000Z",
		folder_id: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
		content: 'blah',
  }
}

  updateNoteName(input) {
	  this.setState({
		  note_name: input,
		  id: this.context.notes.length + 1
	  });
  }

  updateNoteContent(input) {
	  this.setState({
		  content: input
	  });
  }

  updateNoteFolder(input, folders) {
	  const singleFolder = folders.find(folder => folder.folder_name === input)
	  this.setState({
		folder_id: singleFolder.folder_id, 
	  });
  }

  handleSubmit(event) {
	  event.preventDefault();
	  const note = this.state;
	  this.context.addNote(note);
	//   this.props.history.push('/');

	  fetch('http://localhost:5000/notes', {
		method: 'POST',
		headers: {
				'content-type': 'application/json'
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
		.then(this.props.history.push('/'))
		.catch(error => this.setState({error}))
}

validateLength() {
	const noteName = this.state.note_name

  if (this.state.note_name.trim().length === 0) {
	  return 'Name can not be blank'
  }

  if (noteName.length === 0) {
	  return 'Name can not be blank'
  }

	if ((noteName.length < 3)&&(noteName.length > 0)) {
		return 'Name must be longer than 3 characters'
	}
}

validateExistingName() {
	const noteName = this.state.name
	const notes = this.context.notes.map(note => note.name)

	if (notes.find(note => note === noteName)) {
		return 'Note name already exists'
	}
}

validateContent() {
	const noteContent = this.state.content

	if ((noteContent.length < 3)&&(noteContent.length > 0)) {
		return 'Content must be longer than 3 characters'
	}
}

  render() {

	  const {folders} = this.context

	  return (

		  <form onSubmit={e => this.handleSubmit(e)} className={['Noteful-form'].join(' ')}>
			  <label htmlFor='note_input_field'>Name</label>
			  <input id='note_input_field' type='text' onChange={e => this.updateNoteName(e.target.value)}></input>
			

			  <label htmlFor='folder_select_menu'>Folder</label>
			  <select id='folder_select_menu' onChange={e => this.updateNoteFolder(e.target.value, folders)}>
				  {folders.map(folder => (
					  <option value={folder.folder_name} key={folder.folder_name}>{folder.folder_name}</option>
				  ))}
			  </select>

			  <label htmlFor='content_area'>Content</label>
			  <textarea id='content_area' type='text' onChange={e => this.updateNoteContent(e.target.value)}></textarea>
			  

			  <button type='submit' disabled={
					  this.validateLength() ||
					  this.validateExistingName() ||
					  this.validateContent() }>Submit</button>
		  </form>

	  )
  }
  
}
