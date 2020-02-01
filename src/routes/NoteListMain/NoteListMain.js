import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../../components/Note/Note'
import CircleButton from '../../components/CircleButton/CircleButton'
import MainContext from '../../contexts/MainContext'
import {getNotesForFolder} from '../../services/notes-helpers'
import './NoteListMain.css'


export default class NoteListMain extends Component {
  static contextType = MainContext;

  renderAddNoteButton() {
	  return (
		<div className="NoteListMain__button-container">
		<CircleButton
			tag={Link}
			to="/add-note"
			type="button"
			className="NoteListMain__add-note-button"
		>
		<FontAwesomeIcon icon="plus" />
		<br />
		Note
		</CircleButton>
		</div>
	  )
  }

  render() {
    const params = this.props.match.params.folderId;
	let notes = this.context.notes;
	
    if (params) {
		notes = notes ? getNotesForFolder(notes, parseInt(params)) : {};
    }

    return notes ? (
		<section className="NoteListMain">
			<ul>
				{notes.map(note => (
					<li key={note.id}>
						<Note
							id={note.id}
							name={note.note_name}
							modified={note.modified}
							history={this.props.history}
						/>
					</li>
				))}
			</ul>
			{this.context.folders.length ? this.renderAddNoteButton() : '' }
		</section>
    ) : ( 
		<div className="NoteListMain__button-container">
				<CircleButton
					tag={Link}
					to="/add-note"
					type="button"
					className="NoteListMain__add-note-button"
				>
				<FontAwesomeIcon icon="plus" />
				<br />
				Note
				</CircleButton>
			</div>
	);
  }
}

NoteListMain.defaultProps = {
	notes: []
};
