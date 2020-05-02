import React, { Component } from "react";
import "./FollowingPage.css";
import AuthApiService from "../../services/auth-api-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainContext from "../../contexts/MainContext";



export default class FollowingPage extends Component {

	state = {
		connections: [],
		error: null,
		requests: [],
		requestsFullDetails: null,
		currentUser: null,
		PublicPosts: []
	}

	static contextType = MainContext;

	componentDidMount() {
		this.setCurrentUser()
		this.setRequests()
		this.setConnections()
		setTimeout(() => {
			if (this.state.connections.length === 0) {
				this.setState({ showLoader: true })
			}
		}, 500);
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

	setConnections() {
		AuthApiService.getConnections()
			.then(connections => {
				if (connections) {
					this.setState({
						connections: connections
					})
				}

			})
			.catch(error => {
				this.setState({ error }, () => console.log(this.state.error))
			})
	}

	setRequests() {
		AuthApiService.getFollowRequests()
			.then(followRequests => {

				if (followRequests.length) {
					this.setState({
						requests: followRequests
					})

					this.context.requests = true
				} else {
					this.context.requests = false
					this.setState({
						requests: []
					})
				}

				return followRequests

			})
			.then(result => {
				let beforeChange = result

				let afterChange;
				let changeRequest = async () => {
					afterChange = await Promise.all(
						beforeChange.map(x => {
							return AuthApiService.getUserDetailsById(x.user_id)
						})
					)

					this.setState({
						requestsFullDetails: afterChange
					})
				}
				changeRequest()
			})
			.catch(error => {
				this.setState({ error }, () => console.log(this.state.error))
			})
	}

	approveFollowRequest(userId) {

		AuthApiService.postFollowRequests(userId)
			.then(result => {
				this.setRequests()
				this.context.setRequests()
				this.setConnections()
			})
			.catch(error => {
				this.setState({ error }, () => console.log(this.state.error))
			})
	}

	deleteConnection(userId) {

		AuthApiService.deleteConnection(userId)
			.then(result => {
				this.setConnections()
			})
			.catch(error => {
				this.setState({ error }, () => console.log(this.state.error))
			})
	}

	sendFollowRequest(userId) {
		AuthApiService.postRequest(userId)
			.catch(error => {
				this.setState({ error }, () => console.log(this.state.error))
			})
	}


	render() {
		return this.state.requests
			? (
				<>
					<ul className="request_ul">
						{this.state.requests.length ? <p className="section_headers">Requests</p> : ('')}
						{this.state.requestsFullDetails && this.state.requestsFullDetails.map(user => (
							<li className="request_li" key={user.id}>
								<div className="request_box">
									<img src={user.avatar} className="following_page_avatar" alt="avatar"></img>
									<h2 className="connection_name">
										{user.user_name}
									</h2>


									<button className='approve_button' onClick={() => {
										this.approveFollowRequest(user.id)
										this.sendFollowRequest(user.id)
									}
									}>
										<FontAwesomeIcon icon='plus' size="1x" />
									</button>
								</div>
							</li>
						))}
					</ul>

					<ul className="following_ul">
						<p className="section_headers">Following</p>

						{(this.state.connections.length !== 0)
							? this.state.connections.map(user => (
								<li className="following_li" key={user['id']}>
									<div className="following_box">
										<img src={user.avatar} className="following_page_avatar" alt="avatar"></img>
										<h2 className="connection_name">
											{user['user_name']}
										</h2>

										<button className='unfollow_button'
											onClick={() => { this.deleteConnection(user['id']) }}>
											<FontAwesomeIcon icon='minus' size="1x" />
										</button>
									</div>
								</li>))
							: ('')
						}

						{(this.state.showLoader)
							?
							<div>
								<img src="../../../assets/no_friends_unicorn.png" alt="sad unicorn with no friends" className="no_friends_img" />
								<p className="no_friends_caption">You have no friends...go get some!</p>
							</div>
							: ('')
						}
					</ul>
				</>
			) : ('')
	}
}