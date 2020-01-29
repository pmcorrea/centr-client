import React, {Component} from 'react'
import { Button, Input } from "../../Utils/Utils";
import './RegisterPage.css'
import MainContext from "../../contexts/MainContext";
import AuthApiService from "../../services/auth-api-service";


export default class RegisterPage extends Component {

	static contextType = MainContext

	state = { 
		error: null,
		user_name: null,
		password: null,
	};

	handleRegister(e) {
		e.preventDefault()
		this.setState({ error: null })
		const {user_name, password} = this.state
		console.log(user_name, password)

		AuthApiService.postRegister({
			user_name: user_name, 
			password: password,
		})
			.then(res => {
				// select folders and notes
				this.setState({user_name: null, password: null}, console.log(res))
			})
			.catch(res => {
				this.setState({ error: res.error });
			})
	}

	setUsername(username) {
		this.setState({
			user_name: username
		})
	}

	setPassword(password) {
		this.setState({
			password: password
		})
	}

	render() {
		const { error } = this.state;
		return (
			<>
				<form className="LoginForm" onSubmit={e => this.handleRegister(e)} id="form_register">
				<div role="alert">{error && <p className="red">{error}</p>}</div>

				<div className="user_name">
					<label htmlFor="LoginForm__user_name">User name</label>
					<Input required name="user_name" id="LoginForm__user_name" value={this.state.user_name} onChange={e => this.setUsername(e.target.value)}></Input>
				</div>

				<div className="password">
				<label htmlFor="LoginForm__password">Password</label>
				<Input
					required
					name="password"
					type="password"
					id="LoginForm__password"
					onChange={e => this.setPassword(e.target.value)}
					// value={this.state.password} 
				></Input>
				<Input
					required
					name="password_confirm"
					type="password"
					id="LoginForm__password_confirm"
					// value={this.state.password}
				></Input>
				</div>

				<Button type="submit">Register</Button>
      </form>
			</>
		)
	}
}