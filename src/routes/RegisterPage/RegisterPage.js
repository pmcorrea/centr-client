import React, {Component} from 'react'
import './RegisterPage.css'
import MainContext from "../../contexts/MainContext";
import AuthApiService from "../../services/auth-api-service";
import BG from './login_background.png'


export default class RegisterPage extends Component {

	static contextType = MainContext

	state = { 
		error: null,
		user_name: null,
		password: '',
		passwordConfirm: '',
		visibility: 'Private',
		showPasswordValidationBox: true,
		username_exist: true, 
		profilePicURL: ''
	};

	onRegisterSuccess = () => {
		this.props.history.push("/");
	}

	handleRegister(e) {
		e.preventDefault()

		this.setState({ error: null })
		const {user_name, password, visibility, profilePicURL} = this.state

		AuthApiService.postRegister({
			user_name: user_name, 
			password: password,
			visibility: visibility,
			profilePicURL: profilePicURL
		})
		.then(res => {
			this.onRegisterSuccess();
		})
		.catch(res => {
			this.setState({ error: res.error });
		})
	}

	setUsername(username) {
		this.setState({
			user_name: username
		}, () => this.checkUsername())
	}

	checkUsername() {
		const {user_name} = this.state

		if(user_name.length > 4) {
			AuthApiService.checkUsername({
				user_name: user_name
			})
			.then(res => {
				this.setState({
					username_exist: res
				})
			})
			.catch(res => {
				this.setState({ error: res.message });
			})
		} 

		else {
			this.setState({
				username_exist: true
			})
		}		
	}

	setPassword(password) {
		this.setState({
			password: password
		}, () => {
			this.validatePassword()
			this.matchPasswords()
		})
	}

	setPasswordConfirm(password) {
		this.setState({
			passwordConfirm: password
		}, () => {
			this.validatePassword()
			this.matchPasswords()
		})
	}

	validatePassword() {
		let pw = this.state.password
		let pwPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[\S]+/
		let whiteSpacePattern = /(\s)+/
		let length = pw.length >= 8
		let result = pwPattern.test(pw)
		let result2 = whiteSpacePattern.test(pw)

		if (result && !result2 && length) {
			this.setState({
				showPasswordValidationBox: false
			})
		} else {
			this.setState({
				showPasswordValidationBox: true
			})
		}
	}

	matchPasswords() {
		let pw = this.state.password
		let pwc = this.state.passwordConfirm

		let match = pw === pwc
		return match
	}

	disableSubmitbutton() {
		if (!this.state.showPasswordValidationBox && !this.state.username_exist) {
			let match = this.matchPasswords()

			if (match) {
				return false
			}
			return true
			
		} return true
	}



	render() {
		const { error } = this.state;
		const { showPasswordValidationBox } = this.state;
		return (
			<>
			<div className="registration__container">
				<h1>REGISTER</h1>
				<img src={BG} className="bg_image" alt="background"/>
				
				<div className="RegisterForm__form_contianer">
					<form className="RegisterForm" onSubmit={e => this.handleRegister(e)} id="form_register">
						<div role="alert">{error && <p>{error}</p>}</div>

						<input 
							className='input_field'
							required 
							placeholder="username"
							style={{
								borderColor: this.state.username_exist ? 'red' : 'green',
								textDecoration: this.state.username_exist ? 'line-through' : 'none'
							}}
							name="user_name" id="LoginForm__user_name" 
							onChange={e => this.setUsername(e.target.value)}></input>

						<input
							className='input_field'
							required
							name="password"
							type="password"
							placeholder="password"
							id="LoginForm__password"
							style={{borderColor: this.disableSubmitbutton() ? 'red' : 'green'}}
							onChange={e => {this.setPassword(e.target.value)}}></input>
				
						<input
							className='input_field'
							required
							name="password_confirm"
							type="password"
							placeholder="password"
							id="LoginForm__password_confirm"
							style={{borderColor: this.disableSubmitbutton() ? 'red' : 'green'}}
							onChange={e => this.setPasswordConfirm(e.target.value)}></input>

						<button className='register_button' type="submit" 
							disabled={this.disableSubmitbutton()}
							>Register</button>

						{showPasswordValidationBox && 
							<div role="alert" className="registration__validation_box">
								<p className="validation_rules">Password must include:</p>
								<p className="validation_rules">8 characters minimum, no spaces</p>
								<p className="validation_rules">Uppercase and lowercase letters</p>
								<p className="validation_rules">Special symbol and numbers</p>
							</div>
						}

      				</form>
				</div>
	  		</div>
			</>
		)
	}
}