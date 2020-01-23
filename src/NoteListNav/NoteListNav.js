import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import { countNotesForFolder } from '../notes-helpers'
import './NoteListNav.css'
import {MainContext} from '../MainContext.js'

export default class NoteListNav extends Component {

  static contextType = MainContext;

  constructor(props){
    super(props)
    this.state = {

    }
  }

  handleDeleteFolder(value) {
    this.context.handleDeleteFolder(value)
    this.props.history.push('/')
  }

  render() {
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav__list'>
          {this.props.folders.map(folder =>
            <li key={folder.id} className='NoteListNav__li_element'>
              <NavLink
                className='NoteListNav__folder-link'
                to={`/folder/${folder.folder_id}`}>
            
               {folder.folder_name}
  
               <span className='NoteListNav__num-notes'>
                    {countNotesForFolder(this.props.notes, folder.folder_id)}
                </span>
              </NavLink>
              <button className='Folder__delete' type='button' onClick={() => this.handleDeleteFolder(folder.folder_id)}>
                  <FontAwesomeIcon icon='trash-alt' />
              </button>
            </li>
          )}
        </ul>
        <div className='NoteListNav__button-wrapper'>
          <CircleButton
            tag={Link}
            to='/add-folder'
            type='button'
            className='NoteListNav__add-folder-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Folder
          </CircleButton>
        </div>
      </div>
    )
  }
  
}

NoteListNav.defaultProps = {
  folders: []
}
