import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../../components/CircleButton/CircleButton'
import { countNotesForFolder } from '../../services/notes-helpers'
import './NoteListNav.css'
import MainContext from '../../contexts/MainContext.js'
import AuthApiService from "../../services/auth-api-service.js"


export default class NoteListNav extends Component {

  static contextType = MainContext;

  handleDeleteFolder(value) {
    AuthApiService.handleDeleteFolder(value)
    .then(result => {
      this.context.getData()
    })
    .catch(error => {
      console.error(error)
    })   
  }

  render() {
    return this.context.folders ? (
      <div className="NoteListNav">
        <ul className="NoteListNav__list">
          {this.context.folders.map(folder => (
            <li key={folder.id} className="NoteListNav__li_element">
              <NavLink
                className="NoteListNav__folder-link"
                to={`/folder/${folder.id}`}
              >
                {folder.folder_name}

                <span className="NoteListNav__num-notes">
                  {countNotesForFolder(this.context.notes, folder.id)}
                </span>
              </NavLink>
              <button
                className="Folder__delete"
                type="button"
                onClick={() => this.handleDeleteFolder(folder.id)}
              >
                <FontAwesomeIcon icon="trash-alt" />
              </button>
            </li>
          ))}
        </ul>
        <div className="NoteListNav__button-wrapper">
          <CircleButton
            tag={Link}
            to="/add-folder"
            type="button"
            className="NoteListNav__add-folder-button"
          >
            <FontAwesomeIcon icon="plus" />
            <br />
            Folder
          </CircleButton>
        </div>
      </div>
    ) : ('');
  }
  
}

NoteListNav.defaultProps = {
  folders: []
}
