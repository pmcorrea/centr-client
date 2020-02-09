import React, { Component } from "react";
import "./FollowingPage.css";
import AuthApiService from "../../services/auth-api-service";
// import { Link } from 'react-router-dom'

export default class FollowingPage extends Component {

  state = {
    following: [],
    error: null,
  }

  componentDidMount() {
    this.getConnectionsWithDetails()
  }

  getConnectionsWithDetails() {
    AuthApiService.getConnectionsWithDetails()
    .then(result => {
      this.setState({
        following: result
      })
    })
    .catch(error => {
      this.setState({ error }, () => console.log(this.state.error))
    });
  }

  deleteConnection(user) {
    let oldConnectionId = user[0]['id']


      AuthApiService.deleteConnection({oldConnectionId})
        .then(result => {
          this.getConnectionsWithDetails()
      })
      .catch(error => {
        this.setState({ error }, () => console.log(this.state.error))
      });
  }

  deleteFollower(user) {
    let oldConnectionId = user[0]['id']


    AuthApiService.deleteFollower({oldConnectionId})
      .then(result => {
        this.getConnectionsWithDetails()
    })
    .catch(error => {
      this.setState({ error }, () => console.log(this.state.error))
    });
  }

  render() {
    return this.state.following ? (
      <>
      <ul>
          {this.state.following.map(user => (
            <li key={user[0]['user_name']}>
                <div className="user_box">
                <h2 className="Note__title">
                  {user[0]['user_name']}
                </h2>
                <br />
                <h2 className="Note__title">
                  {user[0]['visibility']}
                </h2>
                  <button className='follow_button' onClick={() => {
                      this.deleteConnection(user)
                      this.deleteFollower(user)
                       }
                      }>Unfollow</button>
                </div>
            </li>
          ))}
      </ul>
      </>
    ) : ('')
  }
}