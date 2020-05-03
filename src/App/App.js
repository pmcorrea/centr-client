// Libraries
import React, { Component } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Components

// Routes
import AddFolderForm from "../routes/AddFolderForm/AddFolderForm";
import AddPostForm from "../routes/AddPostForm/AddPostForm";
import LoginPage from "../routes/LoginPage/LoginPage";
import RegisterPage from "../routes/RegisterPage/RegisterPage";
import FoldersView from "../routes/FoldersView/FoldersView";
import PostsList from "../routes/PostsList/PostsList";
import PostWithContent from "../routes/PostWithContent/PostWithContent";
import AccountPage from "../routes/AccountPage/AccountPage";
import DiscoverPage from "../routes/DiscoverPage/DiscoverPage";
import FollowingPage from "../routes/FollowingPage/FollowingPage";
import EditPost from "../routes/EditPost/EditPost";
import Feed from "../routes/Feed/Feed";
import PublicPostRoute from "../routes/PublicPostRoute/PublicPostRoute";

// Contexts
import MainContext from "../contexts/MainContext";

// Helpers, services, and configs
import TokenHelpers from "../services/token-helpers";
import AuthApiService from "../services/auth-api-service";

// Style
import "./App.css";

export default class App extends Component {
	constructor() {
		super()
		// App State will serve as context
		this.state = {
			posts: [],
			publicPosts: [],
			folders: [],
			authToken: null,
			connections: [],
			requests: false,

			setAuthToken: authToken => this.setState({ authToken }),
			getDataWithToken: () => {
				let token = TokenHelpers.getAuthToken();

				AuthApiService.postLogin({
					user_name: null,
					password: null,
					token: token
				})
					.then(res => {
						this.state.setFolders(res["folders"])
						this.state.setPosts(res["posts"])
					})
					.catch(function (error) {
						console.error(error)
					})
			},
			setPosts: posts => {
				this.setState({ posts })
			},
			setFolders: folders => {
				this.setState({ folders })
			},
			setRequests: () => {
				AuthApiService.getFollowRequests()
					.then(followRequests => {
						if (followRequests.length !== 0) {
							this.setState({
								requests: true
							})
						} else {
							this.setState({
								requests: false
							})
						}
					})
					.catch(error => {
						this.setState({ error }, () => console.log(this.state.error))
					})
			}
		}
	}



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
				this.setState({
					publicPosts: result
				})
			})
			.catch(error => {
				this.setState({ error }, () => console.log(this.state.error))
			})

	}

	// Lifecycle
	componentDidMount() {
		this.setConnections()
		this.state.getDataWithToken()
		this.state.setRequests()
	}

	// Render Methods
	renderMainRoutes() {
		return (
			<>
				{["/myposts", "/folder/:folderId"].map(path => (
					<Route
						key={path}
						path={path}
						render={routeProps => {
							if (!TokenHelpers.hasAuthToken()) {
								return <Redirect to="/login" />
							}
							return <PostsList {...routeProps} />
						}}
					/>
				))}

				<Route
					path="/folders"
					render={routeProps => {
						if (!TokenHelpers.hasAuthToken()) {
							return <Redirect to="/login" />
						}
						return <FoldersView {...routeProps} />
					}}
				/>

				<Route
					path="/add-folder"
					render={routeProps => {
						if (!TokenHelpers.hasAuthToken()) {
							return <Redirect to="/login" />
						}
						return <AddFolderForm {...routeProps} />
					}}
				/>

				<Route
					path="/post/:postId"
					render={routeProps => {
						if (!TokenHelpers.hasAuthToken()) {
							return <Redirect to="/login" />
						}
						return <PostWithContent {...routeProps} />
					}}
				/>

				<Route
					path="/add-post"
					render={routeProps => {
						if (!TokenHelpers.hasAuthToken()) {
							return <Redirect to="/login" />
						}
						return <AddPostForm {...routeProps} />
					}}
				/>

				<Route
					path="/edit/:postId"
					render={routeProps => {
						if (!TokenHelpers.hasAuthToken()) {
							return <Redirect to="/login" />
						}
						return <EditPost {...routeProps} />
					}}
				/>

				<Route
					path="/feed"
					render={routeProps => {
						if (!TokenHelpers.hasAuthToken()) {
							return <Redirect to="/login" />
						}
						return <Feed {...routeProps} />
					}}
				/>

				<Route
					path="/discover"
					render={routeProps => {
						if (!TokenHelpers.hasAuthToken()) {
							return <Redirect to="/login" />
						}
						return <DiscoverPage {...routeProps} />
					}}
				/>

				<Route
					path="/following"
					render={routeProps => {
						if (!TokenHelpers.hasAuthToken()) {
							return <Redirect to="/login" />
						}
						return <FollowingPage {...routeProps} />
					}}
				/>

				<Route
					path="/account"
					render={routeProps => {
						if (!TokenHelpers.hasAuthToken()) {
							return <Redirect to="/login" />
						}
						return <AccountPage {...routeProps} />
					}}
				/>

				<Route
					path="/"
					exact
					component={LoginPage}
				/>

				<Route
					path="/register"
					component={RegisterPage}
				/>

				<Route
					path="/PublicPost/:postId"
					render={routeProps => {
						if (!TokenHelpers.hasAuthToken()) {
							return <Redirect to="/login" />
						}
						return <PublicPostRoute {...routeProps} />
					}}
				/>
			</>
		);
	}

	renderbuttons() {
		return (
			<>
				<button className="home icons">
					<Link to="/feed">
						{window.location.pathname === "/feed"
							? <FontAwesomeIcon className="icons" icon='home' size="2x" style={{ color: "orange" }} />
							: <FontAwesomeIcon className="icons" icon='home' size="2x" />}
					</Link>
				</button>

				<button className="following icons">
					<Link to="/following">
						{this.state.requests ?
							<FontAwesomeIcon className="notifications" icon='circle' size="1x" />
							: (' ')}

						{window.location.pathname === "/following"
							? <FontAwesomeIcon className="icons" icon='user-friends' size="2x" style={{ color: "orange" }} />
							: <FontAwesomeIcon className="icons" icon='user-friends' size="2x" />}
					</Link>
				</button>

				<button className="discover icons">
					<Link to="/discover">
						{window.location.pathname === "/discover"
							? <FontAwesomeIcon className="icons" icon='search' size="2x" style={{ color: "orange" }} />
							: <FontAwesomeIcon className="icons" icon='search' size="2x" />}
					</Link>
				</button>

				<button className="folder icons">
					<Link to="/folders">
						{window.location.pathname === "/folders"
							? <FontAwesomeIcon className="icons" icon='folder' size="2x" style={{ color: "orange" }} />
							: <FontAwesomeIcon className="icons" icon='folder' size="2x" />}
					</Link>
				</button>

				<button className="account icons">
					<Link to="/account">
						{window.location.pathname === "/account"
							? <FontAwesomeIcon className="icons" icon='user-circle' size="2x" style={{ color: "orange" }} />
							: <FontAwesomeIcon className="icons" icon='user-circle' size="2x" />}
					</Link>
				</button>
			</>
		)
	}

	render() {
		return (
			<MainContext.Provider value={this.state}>
				<div className="App">
					<main className="App__main">
						{this.renderMainRoutes()}
					</main>

					{window.location.pathname === "/" | window.location.pathname === "/register"
						? ""
						:
						<div className='icons_bar'>
							{this.renderbuttons()}
						</div>
					}
				</div>
			</MainContext.Provider>
		)
	}
}
