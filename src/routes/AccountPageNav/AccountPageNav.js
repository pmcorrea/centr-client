import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../../components/CircleButton/CircleButton'
import './AccountPageNav.css'
import MainContext from '../../contexts/MainContext.js'


export default class AccountPageNav extends Component {
  static contextType = MainContext

  render(){

    return (
      <div className='AccountPageNav'>
        <CircleButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='AccountPageNav__back-button'
        >
          <FontAwesomeIcon icon='chevron-left' />
          <br />
          Back
        </CircleButton>
        
      </div>
    )
  }

}

AccountPageNav.defaultProps = {
  history: {
    goBack: () => {}
  }
}
