import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// Context and service
import MainContext from "../../contexts/MainContext";
import AuthApiService from "../../services/auth-api-service.js"
// Style
import "./Post.css";

export default class Post extends Component {
	static contextType = MainContext;

	handleDeletePost(value) {
		AuthApiService.handleDeletePost(value)
		.then(result => {
			this.context.getDataWithToken()
		})
		.catch(error => {
			console.error(error)
		})  
	}

	render() {
		let modified = new Date(this.props.modified)
		let date = modified.getDate()
		let month = modified.getMonth()
		let year = modified.getFullYear()

		return (
			<>
			<div className="Post">
				<div className="Post__info">
					<h2 className="Post__title">
						<Link to={`/post/${this.props.id}`}>{this.props.name}</Link>
					</h2>

					<div className="Post__dates-modified">
						<span className="Date">
							{`${month}/${date}/${year}`}
						</span>
					</div>

					<div className="Post__visibility_div">
						<p className="Post__visibility">
							{this.props.visibility}
						</p>
					</div>
				</div>

				<div className="Post__buttons_container">
					<button
						className="Post__edit_button"
						type="button">
						<Link to={`/edit/${this.props.id}`}>
							<FontAwesomeIcon className="Folder__delete" icon="edit"/>
						</Link>
					</button>

					<button
						className="Post__delete_button"
						type="button"
						onClick={() => this.handleDeletePost(this.props.id)}>
						<FontAwesomeIcon className="Folder__delete" icon="trash-alt"/>
					</button>
				</div>
			</div>
			</>
		);
	}
}
