import config from '../config'
import TokenHelpers from "../services/token-helpers";


const AuthApiService = {
  postNote(note) {
    return fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${TokenHelpers.getAuthToken()}`,
      },
      body: JSON.stringify({
        note
      })
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  postFolder(folder) {
    return fetch(`${config.API_ENDPOINT}/folders`, {
			method: 'POST',
			headers: {
					'content-type': 'application/json',
					'authorization': `bearer ${TokenHelpers.getAuthToken()}`,
			},
			body: JSON.stringify({
				folder
			})
		})
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },

  handleDeleteNote(noteId) {
    return fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        Authorization: `bearer ${TokenHelpers.getAuthToken()}`
      }
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },

  handleDeleteFolder(folderId) {
    return fetch(`${config.API_ENDPOINT}/folders/${folderId}`, {
      method: "DELETE",
      headers: {
        Authorization: `bearer ${TokenHelpers.getAuthToken()}`
      }
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },

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

  getUserDetailsById() {
    return fetch(`${config.API_ENDPOINT}/api/auth/getUserDetailsById`, {
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

  getAllUsers() {
    return fetch(`${config.API_ENDPOINT}/api/auth/getAllUsers`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenHelpers.getAuthToken()}`
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  getConnections() {
    return fetch(`${config.API_ENDPOINT}/api/auth/getConnections`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenHelpers.getAuthToken()}`
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  getConnectionsWithDetails() {
    return fetch(`${config.API_ENDPOINT}/api/auth/getConnectionswithdetails`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenHelpers.getAuthToken()}`
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  postConnection({newConnectionId}) {
    return fetch(`${config.API_ENDPOINT}/api/auth/postConnection`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenHelpers.getAuthToken()}`
      },
      body: JSON.stringify({ newConnectionId}),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  postFollower({newConnectionId}) {
    return fetch(`${config.API_ENDPOINT}/api/auth/postFollower`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenHelpers.getAuthToken()}`
      },
      body: JSON.stringify({ newConnectionId}),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  deleteConnection({oldConnectionId}) {
    return fetch(`${config.API_ENDPOINT}/api/auth/deleteConnection`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenHelpers.getAuthToken()}`
      },
      body: JSON.stringify({ oldConnectionId}),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  deleteFollower({oldConnectionId}) {
    return fetch(`${config.API_ENDPOINT}/api/auth/deleteFollower`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenHelpers.getAuthToken()}`
      },
      body: JSON.stringify({ oldConnectionId}),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
}

export default AuthApiService