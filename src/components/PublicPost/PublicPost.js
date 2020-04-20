import React, { Component } from "react";
// Context and service
import MainContext from "../../contexts/MainContext";
import AuthApiService from "../../services/auth-api-service.js"
// Style
import "./PublicPost.css";

export default class PublicPost extends Component {
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
		let someDateString = this.props.modified 
		let someDate = new Date(someDateString)
		someDate = someDate.toLocaleString()

		return (
			<div className="PublicPost">
				<div className="PublicPost_container">
					<img src={this.props.avatar} alt="avatar" className="public_post_avatar"></img>

					<h2 className="PublicPost__title">
						{this.props.name}
					</h2>

					<div className="PublicPost__dates">
						<div className="PublicPost__dates-modified">
							<span className="PublicPost_Date">
								{someDate}
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
