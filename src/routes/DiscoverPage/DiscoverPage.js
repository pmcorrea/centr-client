import React, { Component } from "react";
import "./DiscoverPage.css";
import AuthApiService from "../../services/auth-api-service";

export default class DiscoverPage extends Component {

  state = {
    users: [],
    following: [],
    error: null,
    currentUser: null
  }

  componentDidMount() {
    this.getAllUsers()
    this.getConnections()
    this.getCurrentUser()
  }

  getCurrentUser() {
    AuthApiService.getUserDetailsById()
    .then(result => {
      result = result[0]['user_name']

      this.setState({
        currentUser: result
      })
      
    })
  }

  getConnections() {
    AuthApiService.getConnections()
    .then(result => {
      if (result[0]['connections']) {
        this.setState({
          following: result[0]['connections']
        })
      }
    })
    .catch(error => {
      this.setState({ error }, () => console.log(this.state.error))
    });
  }

  getAllUsers() {
    AuthApiService.getAllUsers()
    .then(result => {
      this.setState({ users:  result})
    }, () => this.setNotFollowing())
    .catch(error => {
      this.setState({ error }, () => console.log(this.state.error))
    });
  }

  addNewConnection(user) {
    let newConnectionId = user.id

      AuthApiService.postConnection({newConnectionId})
        .then(result => {
          this.getConnections()
      })
      .catch(error => {
        this.setState({ error }, () => console.log(this.state.error))
      });
  }

  postFollower(user) {
    let newConnectionId = user.id
        
        AuthApiService.postFollower({newConnectionId})
        .then(result => {
          this.getConnections()
         })
        .catch(error => {
          this.setState({ error }, () => console.log(this.state.error))
        });

  }

  isFollower(user) {
    if (this.state.following) {
      let result = this.state.following.includes(user.user_name)
      if (!result) {
        return 'Follow'
      } else {
        return 'Unfollow'
      }
    } 
  }

  render() {
    // To Do: Change to limit total users not following returned 
    let arr1 = this.state.users
    let arr2 = this.state.following

    // Not following
    // Return arr1 without arr2 values
    let notFollowing = this.state.following ? arr1.filter(x => !arr2.includes(x.user_name)) : this.state.users;

    notFollowing = notFollowing.filter(conn => (
      conn['user_name'] !== this.state.currentUser
    ))
      
    return this.state.users ? (
      <>
      <ul>
          {notFollowing.map(user => (
            <li key={user.user_name}>
                <div className="user_box">
                <h2 className="Note__title">
                  {user.user_name}
                </h2>
                <br />
                <h2 className="Note__title">
                  {user.visibility}
                </h2>
                  <button className='follow_button' onClick={() => {
                    this.addNewConnection(user)
                    this.postFollower(user)
                  }
                  }>Follow</button>
                </div>
            </li>
          ))}
      </ul>
      </>
    ) : ('')
  }
}