import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../../components/CircleButton/CircleButton'
import './NotePageNav.css'
import MainContext from '../../contexts/MainContext.js'
import {findNote, findFolder} from '../../services/notes-helpers';


export default class NotePageNav extends Component {
  static contextType = MainContext

  render(){
    const params = this.props.match.params.noteId;
    let notes = this.context.notes
    let folders = this.context.folders
    let note = folders ? findNote(notes, parseInt(params)) : {};
    let folder = note ?  findFolder(folders, note.folder_id) : {};

    return (
      <div className='NotePageNav'>
        <CircleButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePageNav__back-button'
        >
          <FontAwesomeIcon icon='chevron-left' />
          <br />
          Back
        </CircleButton>
        {folder && (
          <h3 className='NotePageNav__folder-name'>
            {folder.folder_name}
          </h3>
        )}
      </div>
    )
  }

}

NotePageNav.defaultProps = {
  history: {
    goBack: () => {}
  }
}
