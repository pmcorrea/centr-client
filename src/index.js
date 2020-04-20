// Libraries
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

// Style
import './index.css'

// Components
import App from './App/App'

// Font Awesome icons
import {
	faPlus, faChevronLeft, faTrashAlt, faCheckDouble, faUserCircle, 
	faUserFriends, faSearch, faSignOutAlt, faHome, faFolder, faStickyNote,
	faUserAlt, faCircle, faMinus, faEdit
} from '@fortawesome/free-solid-svg-icons'
// Font Awesome library
import { library } from '@fortawesome/fontawesome-svg-core'
// Add Font Awesome icons to library
library.add(
	faPlus, faChevronLeft, faTrashAlt, faCheckDouble, faUserCircle, 
	faUserFriends, faSearch, faSignOutAlt, faHome, faFolder, faStickyNote,
	faUserAlt, faCircle, faMinus, faEdit
	)

// Wrap router around entire App component
ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
)