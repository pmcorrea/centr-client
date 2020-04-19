// Components
import React, { Component } from "react";
import { Button, Input } from "../../Utils/Utils";
// Context
import MainContext from "../../contexts/MainContext";
// Services
import TokenHelpers from "../../services/token-helpers";
import AuthApiService from "../../services/auth-api-service";
// Style
import "./LoginForm.css";

export default class LoginForm extends Component {
	static defaultProps = {
		onLoginSuccess: () => {}
	};

	static contextType = MainContext;

	state = { error: null };

	handleSubmitJwtAuth = ev => {
		ev.preventDefault();
		this.setState({ error: null });
		const { user_name, password } = ev.target;

		AuthApiService.postLogin({
			user_name: user_name.value,
			password: password.value
		})
		.then(res => {
			user_name.value = "";
			password.value = "";
			TokenHelpers.saveAuthToken(res["authToken"]);
			this.context.setAuthToken(res["authToken"]);
			this.context.setFolders(res["folders"]);
			this.context.setPosts(res["posts"]);
			this.context.setRequests();
			this.props.onLoginSuccess();
		})
		.catch(res => {
			this.setState({ error: res.error });
		});
	};

	render() {
		const { error } = this.state;
		
		return (
			<form className="LoginForm__form" onSubmit={ev => this.handleSubmitJwtAuth(ev)}>
				<div role="alert">{error && <p className="red">{error}</p>}</div>

				{/* <label 
					htmlFor="LoginForm__user_name" 
					className="LoginForm__user_name_label">
					User name
				</label> */}
				<Input 
					required 
					name="user_name" 
					id="LoginForm__user_name"
					className="LoginForm__user_name_input"
					placeholder="username"
					></Input>

				{/* <label 
					htmlFor="LoginForm__password" 
					className="LoginForm__password_label">
					Password
				</label> */}
				<Input
					required
					name="password"
					type="password"
					id="LoginForm__password"
					className="LoginForm__password_input"
					placeholder="password"
					></Input>

				<Button 
					type="submit" 
					className="LoginForm__login_button">
					Login
				</Button>

				<Button 
					type="submit" 
					className="LoginForm__register_button" 
					onClick={this.props.goToRegister}>
					Register
				</Button>
			</form>
		);
	}
}
