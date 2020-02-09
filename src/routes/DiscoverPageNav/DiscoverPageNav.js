import React, { Component } from "react";
import "./DiscoverPageNav.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../../components/CircleButton/CircleButton'

export default class DiscoverPageNav extends Component {

  render() {
    return (
      <>
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

          <h3 className='NotePageNav__folder-name'>
            {`Discover`}
          </h3>

      </div>
      </>
    )
  }
}