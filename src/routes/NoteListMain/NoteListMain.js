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

  render() {
    const params = this.props.match.params.folderId;
    let notes = this.context.notes;

    if (params) {
		notes = notes ? getNotesForFolder(notes, params): {};
    }

    return this.context.notes.length ? (
		<section className="NoteListMain">
			<ul>
				{notes.map(note => (
					<li key={note.note_id}>
						<Note
							id={note.note_id}
							name={note.note_name}
							modified={note.modified}
							history={this.props.history}
						/>
					</li>
				))}
			</ul>
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
		</section>
    ) : ( "nothing" );
  }
}

NoteListMain.defaultProps = {
	notes: []
};
