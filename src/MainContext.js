import { createContext }  from 'react'

export const MainContext = createContext({
	folders: [],
	notes: [],
	handleDeleteNote: () => {},
	handleDeleteFolder: () => {},
	addFolder: () => {},
	addNote: () => {}
})
