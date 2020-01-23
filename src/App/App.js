import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolderForm from '../AddFolderForm/AddFolderForm';
import AddNoteForm from '../AddNoteForm/AddNoteForm';
// import dummyStore from '../dummy-store';
import {MainContext} from '../MainContext'
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import './App.css';
import config from '../config'

class App extends Component {
    state = {
        notes: [],
        folders: []
    }

    componentDidMount() {
        fetch(`${config.API_ENDPOINT}/folders`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status)
                }
                return response.json()
            })
            .then(myJson => {
                this.setState({
                    folders: myJson
                })
            })
            .catch(error => this.setState({error}))

        fetch(`${config.API_ENDPOINT}/notes`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status)
                }
                return response.json()
            })
            .then(myJson => {
                this.setState({
                    notes: myJson
                })
            })
            .catch(error => this.setState({error}))
    }

    // Context Methods
    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.note_id !== noteId)
        });

        fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
            method: 'DELETE'
	    })
		.then(response => {
			if (!response.ok) {
				throw new Error(response.status)
			}
			return response.json()
		})
		.catch(error => this.setState({error}))

    }

    handleDeleteFolder = folderId => {
        fetch(`${config.API_ENDPOINT}/folders/${folderId}`, {
            method: 'DELETE'
	    })
		.then(response => {
			if (!response.ok) {
				throw new Error(response.status)
			}
			return response.json()
        })
        .then(data => {
            // console.log(data)
            return data
        })
        .then(data => {
            this.setState({
                folders: data
            })
        })
        .then(data => {
            this.setState({
                notes: this.state.notes.filter(note => note.folder_id !== folderId)
            });
        })
		.catch(error => this.setState({error}))

    }

	addFolder = folder => {
		this.setState({
			folders: [...this.state.folders, folder]
		})
	}

	addNote = note => {
		this.setState({
			notes: [...this.state.notes, note]
		})
	}

    renderNavRoutes() {
        const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => (
                            <NoteListNav
                                folders={folders}
                                notes={notes}
                                {...routeProps}
                            />
                        )}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId) || {};
                        const folder = findFolder(folders, note.folder_id);
                        return <NotePageNav {...routeProps} folder={folder} />;
                    }}
                />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        const {notes} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => {
                            const {folderId} = routeProps.match.params;
                            const notesForFolder = getNotesForFolder(
                                notes,
                                folderId
                            );
                            return (
                                <NoteListMain
                                    {...routeProps}
                                    notes={notesForFolder}
                                />
                            );
                        }}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId);
                        return <NotePageMain {...routeProps} note={note} />;
                    }}
                />
                <Route path="/add-folder" component={AddFolderForm} />
                <Route path="/add-note" component={AddNoteForm} />
            </>
        );
    }

    render() {
        const contextValue = {
			folders: this.state.folders,
			notes: this.state.notes,
            handleDeleteNote: this.handleDeleteNote,
            handleDeleteFolder: this.handleDeleteFolder,
			addFolder: this.addFolder,
			addNote: this.addNote,
           }
           
        return (
            <MainContext.Provider value={contextValue}>
            <div className="App">
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                        <FontAwesomeIcon icon="check-double" />
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
            </MainContext.Provider>
        );
    }
}

export default App;
