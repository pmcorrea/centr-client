import React, { Component } from "react";
import "./AccountPage.css";
import { Button, Input } from "../../Utils/Utils";
import AuthApiService from "../../services/auth-api-service";
import MainContext from "../../contexts/MainContext";
import TokenHelpers from "../../services/token-helpers";


export default class AccountPage extends Component {
  static contextType = MainContext;

  state = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    confirmUsername: '',
    visibility: 'Public',
    error: null,
    currentVisibility: null,
    currentUsername: null,
  }

  setOldPassword(oldPassword) {
    this.setState({ oldPassword })
  }

  setNewPassword(newPassword) {
    this.setState({ newPassword })
  }

  setConfirmNewPassword(confirmNewPassword) {
    this.setState({ confirmNewPassword })
  }

  setConfirmUsername(confirmUsername) {
    this.setState({ confirmUsername })
  }

  setVisibility(visibility) {
    this.setState({ visibility })
  }

  handleChangePassword(e) {
    e.preventDefault()
    AuthApiService.postPasswordChange({
      token: TokenHelpers.getAuthToken(),
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword, 
      confirmNewPassword: this.state.confirmNewPassword
    })
    .then(res => {
      this.props.history.push('/')
    })
    .catch(error => {
      this.setState({ error }, () => console.log(this.state.error))
    });
    
  }

  handleChangeVisibility(e) {
    e.preventDefault()
    AuthApiService.postVisibilityChange({
      token: TokenHelpers.getAuthToken(),
      visibility: this.state.visibility
    })
    .then(res => {
      this.props.history.push('/')
    })
    .catch(error => {
      this.setState({ error }, () => console.log(this.state.error))
    });
  }

  handleDeleteAccount(e) {
    e.preventDefault()
    AuthApiService.deleteAccount({
      token: TokenHelpers.getAuthToken(),
      confirmUsername: this.state.confirmUsername,
      currentUsername: this.state.currentUsername
    })
    .then(res => {
      this.props.history.push('/login')
    })
    .catch(error => {
      this.setState({ error }, () => console.log(this.state.error))
    });
  }

  getUserDetailsById() {
    return AuthApiService.getUserDetailsById()
    .then(result => {
      this.setState({ 
        currentVisibility: result[0]['visibility'],
        currentUsername: result[0]['user_name']
      })
    })
    .catch(error => {
      this.setState({ error })
    });
  }

  componentDidMount() {
    this.getUserDetailsById()
  }

  render() {

    const { error } = this.state;
    const { currentVisibility } = this.state;

    return (
      <>
       <div role="alert">{error && <p className="red">{error}</p>}</div>
      {/* Delete Account */}
      <form className="deleteForm" onSubmit={e => this.handleDeleteAccount(e)}>
        <Input placeholder='Type Username' onChange={e => this.setConfirmUsername(e.target.value)}></Input>
        <Button type="submit">Delete Account</Button>
      </form>
      
      {/* Change Password */}
      <form className="changePasswordForm" onSubmit={e => this.handleChangePassword(e)}>
        <Input placeholder='Old Password' onChange={e => this.setOldPassword(e.target.value)}></Input>
        <Input placeholder='New Password' onChange={e => this.setNewPassword(e.target.value)}></Input>
        <Input placeholder='Confirm New Password' onChange={e => this.setConfirmNewPassword(e.target.value)}></Input>
        <Button type="submit">Change Password</Button>
      </form>

      {/* Change Visibility */}
    <p>You are currently: {currentVisibility}</p>
      <form className="changeVisibilityForm" onSubmit={e => this.handleChangeVisibility(e)}>
       <select id='changeVisibilityForm_menu' onChange={e => this.setVisibility(e.target.value)}>
					  <option value='Public' key={'Public'}>Public</option>
            <option value='Private' key={'Private'}>Private</option>
			  </select>
        <Button type="submit">Change Visibility</Button>
      </form>
	  </>
    ) 
  }
}
