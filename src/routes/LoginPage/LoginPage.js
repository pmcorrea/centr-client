import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import './LoginPage.css'
import BG from './login_background.png'

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  handleLoginSuccess = () => {
    this.props.history.push("/");
  }

  goToRegister = () => {
    this.props.history.push("./register");
  }

  render() {
    return (
      <div className='LoginPage'>
        <img src={BG} className="bg_image" alt="background"/>
        <h1>CENTR</h1>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
          goToRegister={this.goToRegister}
        />
      </div>
    )
  }
}