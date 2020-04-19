import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { countPostsForFolder } from '../../services/posts-helpers'
import './FoldersView.css'
import MainContext from '../../contexts/MainContext.js'
import AuthApiService from "../../services/auth-api-service.js"


export default class FoldersView extends Component {

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

  handleShowFolders() {
    this.context.setShowFolders()
  }

  componentDidMount() {
    // this.context.getData()
  }

  render() {

    return this.context.folders ? (
      
      <div className="FoldersView">

<p className="section_headers">Folders</p>


      <div className="FoldersView__buttons_container">
      <div className="FoldersView__button-wrapper">
          <Link to="/add-post">
            {/* <FontAwesomeIcon icon="plus" /> */}
            + add post
            </Link>
        </div>


        <div className="FoldersView__button-wrapper">
          <Link to="/add-folder">
            {/* <FontAwesomeIcon icon="plus" /> */}
            + add folder
            </Link>
        </div>
        </div>

        <ul className="FoldersView__list">
          {this.context.folders.map(folder => (
            <li key={folder.id} className="FoldersView__li_element">
              <NavLink
                className="FoldersView__folder-link"
                to={`/folder/${folder.id}`}
                onClick={() => this.handleShowFolders()}
              >
                {folder.folder_name}
              </NavLink>

            <div>
              <span className="FoldersView__num-posts">
                  {countPostsForFolder(this.context.posts, folder.id)}
                </span>

              <button
                className="Folder__delete"
                type="button"
                onClick={() => this.handleDeleteFolder(folder.id)}
                >
                <FontAwesomeIcon className="Folder__delete" icon="trash-alt"/>
              </button>
            </div>
            </li>
          ))}
        </ul>
        
      </div>
    ) : ('');
  }
  
}

FoldersView.defaultProps = {
  folders: []
}
