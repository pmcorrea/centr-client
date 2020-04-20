import React, { Component } from "react";
import "./Feed.css";
import AuthApiService from "../../services/auth-api-service";
import MainContext from '../../contexts/MainContext'
import { Link } from "react-router-dom";


export default class Feed extends Component {

	state = {
		connections: [],
		error: null,
		requests: [],
		currentUser: null,
		publicPosts: [],
		showLoader: false
	}

  	static contextType = MainContext;

	componentDidMount() {
		this.setCurrentUser()
		this.setConnections()
		setTimeout(() => {
			if(this.state.publicPosts.length === 0){
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

	// Grab connections and set posts
	setConnections() {
		AuthApiService.getConnections()
		.then(connections => {
			if (connections) {
				this.setState({
					connections: connections
				}, () => this.setPublicPosts())
			}
		})
		.catch(error => {
			this.setState({ error }, () => console.log(this.state.error))
		})
	}

	setPublicPosts() {
		let connections = this.state.connections
		let connectionsIds = connections.map(x => {
		return x.id
		})
    
		AuthApiService.getPublicPosts(connectionsIds)
			.then(result => {

				result.forEach(x => {
					let newDate = new Date(x.modified)
					let timeNow = new Date() 
					let diff = timeNow.getTime() - newDate.getTime()
					diff = diff/(1000*60*60*24)
					diff = diff.toFixed(0)
					x.modified = diff
				})

				this.setState({
					publicPosts: result
				})
			})
			.catch(error => {
					this.setState({ error }, () => console.log(this.state.error))
			})
  	}
  
	randomKey() {
		return Math.random().toString(36).substr(2, 9);
	}

  render() {
	return this.state.requests 
	? (<>
		<p className="section_headers">Feed</p>    
		<ul className="feed_ul">
			{(this.state.publicPosts.length !== 0) 
				? this.state.publicPosts.map(post => (
					<li className="feed_li" key={`${post['post_name']}${this.randomKey()}`}>
						<div className="post_box">

							<div className="post_subbox">
								<img src={post.avatar} alt="avatar" className="feed_avatar"></img>
								
								<div className="post_subbox_2">
									<p className="post_user">{post['user_name']}</p>
									<p className="post_modified">{`${post['modified']} days ago`}</p>
								</div>	
							</div>

							<h2 className="post_title">
								<Link to={`/PublicPost/${post['id']}`}>{post['post_name']}</Link>
							</h2>
							<p className="post_content">{`${post['content'].substring(0, 150)}...`}</p>
						</div>
					</li>)) 
				: ('')
			}

			{(this.state.showLoader) 
				? <div>
					<img src="../../../assets/no_friends_unicorn.png" alt="sad unicorn with no friends" className="no_friends_img"/>
					<p className="no_friends_caption">You have no friends...go get some!</p>
				</div>
				: ('')
			}
		</ul>
	</>) 
	: ('')
  }
}