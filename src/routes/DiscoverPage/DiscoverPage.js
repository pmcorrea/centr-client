import React, { Component } from "react";
import "./DiscoverPage.css";
import AuthApiService from "../../services/auth-api-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default class DiscoverPage extends Component {

	state = {
		users: null,
		error: null,
		currentUser: null,
		notFollowing:null
		
	}

	componentDidMount() {
		this.setCurrentUser()
		this.setNotFollowing()
	}

	setNotFollowing() {
		AuthApiService.getNotFollowing()
		.then(notFollowing => {
			if (notFollowing) {
				this.setState({
					notFollowing: notFollowing
				})
			}

		})
		.catch(error => {
			this.setState({ error }, () => console.log(this.state.error))
		})
	}

	setCurrentUser() {
		AuthApiService.getCurrentUserDetailsById()
		.then(currentUser => {
			currentUser = currentUser[0]

			this.setState({
				currentUser: currentUser
			})
		})
		.catch(error => {
			this.setState({ error }, () => console.log(this.state.error))
		})
	}

	sendFollowRequest(toUser) {
		let userId = toUser.id

		AuthApiService.postRequest(userId)
		.then(result => {
			this.setNotFollowing()
		})
		.catch(error => {
			this.setState({ error }, () => console.log(this.state.error))
		})
	}

  render() {

	let notFollowing = this.state.notFollowing ? this.state.notFollowing : ('')
      
    return this.state.notFollowing ? (
	<>
		<ul className="discover_ul">
		<p className="section_headers">Discover</p> 
			{notFollowing.map(user => (
				<li className="discover_li" key={user.user_name}>	
					<div className="discover_box">
						<img src={user.avatar} className="avatar" alt="avatar"></img>
						
						<h2 className="connection_name">
							{user.user_name}
						</h2>
					
						<button className='discover_follow_button' 
							onClick={() => {
								this.sendFollowRequest(user)
							}}>
							<FontAwesomeIcon icon='plus' size="1x"/>
						</button>
					</div>
				</li>
			))}
		</ul>
	</>	
    ) : ('')
	}
}