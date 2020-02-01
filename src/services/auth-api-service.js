import config from '../config'
import TokenHelpers from "../services/token-helpers";


const AuthApiService = {
  postLogin({ user_name, password, token=null}) {
    return fetch(`${config.API_ENDPOINT}/api/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ user_name, password, token }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  postRegister({ user_name, password, visibility }) {
    return fetch(`${config.API_ENDPOINT}/api/auth/register`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ user_name, password, visibility }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  postPasswordChange({ token, oldPassword, newPassword, confirmNewPassword }) {
    return fetch(`${config.API_ENDPOINT}/api/auth/changepassword`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenHelpers.getAuthToken()}`
      },
      body: JSON.stringify({ token, oldPassword, newPassword, confirmNewPassword }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  postVisibilityChange({ token, visibility }) {
    return fetch(`${config.API_ENDPOINT}/api/auth/changevisibility`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenHelpers.getAuthToken()}`
      },
      body: JSON.stringify({ token, visibility }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  getVisibilityAndUserName() {
    return fetch(`${config.API_ENDPOINT}/api/auth/getVisibilityAndUserName`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenHelpers.getAuthToken()}`
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  deleteAccount({token, confirmUsername, currentUsername}) {
    return fetch(`${config.API_ENDPOINT}/api/auth/deleteAccount`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenHelpers.getAuthToken()}`
      },
      body: JSON.stringify({token, confirmUsername, currentUsername}),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
}

export default AuthApiService