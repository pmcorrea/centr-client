import config from '../config'
import TokenHelpers from "../services/token-helpers";


const AuthApiService = {
  // Posts and Folders
  getPostToEdit(postId) {
    return fetch(`${config.API_ENDPOINT}/EditPost`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenHelpers.getAuthToken()}`
      },
      body: JSON.stringify({ postId }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },


  postPost(post) {
    return fetch(`${config.API_ENDPOINT}/posts`, {
      method: 'POST',
      headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${TokenHelpers.getAuthToken()}`,
      },
      body: JSON.stringify({
        post
      })
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },

  updatePost(post) {
    return fetch(`${config.API_ENDPOINT}/updatepost`, {
      method: 'POST',
      headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${TokenHelpers.getAuthToken()}`,
      },
      body: JSON.stringify({
        post
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

  handleDeletePost(postId) {
    return fetch(`${config.API_ENDPOINT}/posts/${postId}`, {
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

  getPublicPosts(userId) {
    return fetch(`${config.API_ENDPOINT}/publicposts`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenHelpers.getAuthToken()}`
      },
      body: JSON.stringify({ userId }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  // Authentication and Registration 
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

  postRegister({ user_name, password, visibility, profilePicURL }) {
    return fetch(`${config.API_ENDPOINT}/api/auth/register`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ user_name, password, visibility, profilePicURL }),
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

  // Users
  getCurrentUserDetailsById() {
    return fetch(`${config.API_ENDPOINT}/api/auth/getCurrentUserDetailsById`, {
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

  getUserDetailsById(userId) {
    return fetch(`${config.API_ENDPOINT}/api/auth/getUserDetailsById`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenHelpers.getAuthToken()}`
      },
      body: JSON.stringify( {userId} ),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getUserDetailsByToken() {
    return fetch(`${config.API_ENDPOINT}/api/auth/getUserDetailsByToken`, {
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







  // Connections
  getConnections() {
    return fetch(`${config.API_ENDPOINT}/api/auth/connections`, {
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

  deleteConnection(userId) {
    return fetch(`${config.API_ENDPOINT}/api/auth/connections`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenHelpers.getAuthToken()}`
      },
      body: JSON.stringify({ userId }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  // Followers
  getFollowers() {
    return fetch(`${config.API_ENDPOINT}/api/auth/followers`, {
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

  deleteFollower(userId) {
    return fetch(`${config.API_ENDPOINT}/api/auth/followers`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenHelpers.getAuthToken()}`
      },
      body: JSON.stringify({ userId }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  getNotFollowing() {
    return fetch(`${config.API_ENDPOINT}/api/auth/notfollowing`, {
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

  // Requests
  getFollowRequests() {
    return fetch(`${config.API_ENDPOINT}/api/auth/followrequests`, {
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

  postFollowRequests(userId) {
    return fetch(`${config.API_ENDPOINT}/api/auth/followrequests`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenHelpers.getAuthToken()}`
      },
      body: JSON.stringify({ userId }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  deleteFollowRequests(userId) {
    return fetch(`${config.API_ENDPOINT}/api/auth/followrequests`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenHelpers.getAuthToken()}`
      },
      body: JSON.stringify({ userId }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  // Sent Requests
  getRequests() {
    return fetch(`${config.API_ENDPOINT}/api/auth/sentrequests`, {
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
  postRequest(userId) {
    return fetch(`${config.API_ENDPOINT}/api/auth/sentrequests`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenHelpers.getAuthToken()}`
      },
      body: JSON.stringify({ userId }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  deleteRequest(userId) {
    return fetch(`${config.API_ENDPOINT}/api/auth/sentrequests`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenHelpers.getAuthToken()}`
      },
      body: JSON.stringify({ userId }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  // Check username avaliability
  checkUsername({ user_name }) {
    return fetch(`${config.API_ENDPOINT}/api/auth/checkUsername`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ user_name }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  updateAvatar(url) {
    return fetch(`${config.API_ENDPOINT}/updateavatar`, {
      method: 'POST',
      headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${TokenHelpers.getAuthToken()}`,
      },
      body: JSON.stringify({
        url
      })
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },

}

export default AuthApiService