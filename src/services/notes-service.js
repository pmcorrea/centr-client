import config from '../config';
import TokenService from './token-service'

export const notesService = {

	getFolders() {
		return fetch(`${config.API_ENDPOINT}/folders`, {
			headers: {
                "Authorization": `bearer ${TokenService.getAuthToken()}`
            },
		  },
		)
		  .then(res =>
			(!res.ok)
			  ? res.json().then(e => Promise.reject(e))
			  : res.json()
		  )
	  },

	getNotes() {
		return fetch(`${config.API_ENDPOINT}/notes`, {
			headers: {
                "Authorization": `bearer ${TokenService.getAuthToken()}`
            },
		  },
		)
		  .then(res =>
			(!res.ok)
			  ? res.json().then(e => Promise.reject(e))
			  : res.json()
		  )
	  },
}

