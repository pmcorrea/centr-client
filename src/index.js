import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App/App'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
	faPlus, faChevronLeft, faTrashAlt, faCheckDouble, faUserCircle, 
	faUserFriends, faSearch, faSignOutAlt, faHome, faFolder, faStickyNote,
	faUserAlt, faCircle, faMinus, faEdit
} from '@fortawesome/free-solid-svg-icons'

library.add(
	faPlus, faChevronLeft, faTrashAlt, faCheckDouble, faUserCircle, 
	faUserFriends, faSearch, faSignOutAlt, faHome, faFolder, faStickyNote,
	faUserAlt, faCircle, faMinus, faEdit
	)

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
)
