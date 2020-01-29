// Libraries
import React, {Component} from 'react';
import {Route, Link, Redirect} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

// Components 
import LoginPage from '../routes/LoginPage/LoginPage';
import NoteListNav from '../routes/NoteListNav/NoteListNav';
import NoteListMain from '../routes/NoteListMain/NoteListMain';
import NotePageNav from '../routes/NotePageNav/NotePageNav';
import NotePageMain from '../routes/NotePageMain/NotePageMain';
import AddFolderForm from '../components/AddFolderForm/AddFolderForm';
import AddNoteForm from '../components/AddNoteForm/AddNoteForm';
import RegisterPage from '../components/RegisterPage/RegisterPage';

// Contexts
import MainContext from '../contexts/MainContext';

// Helpers, service, and variables
import TokenService from '../services/token-service';
import {notesService} from '../services/notes-service';
import config from '../config';

// Style
import './App.css';

export default class App extends Component {

    constructor(){
        super();
        this.state = {
            folders: [],
            notes: [],
            both: false,
            authToken: null,
            setAuthToken: authToken => this.setState({authToken}),

            setNotes: notes => {
                this.setState({ notes }, this.state.ifBoth)
            },    
            setFolders: folders => {
                this.setState({ folders }, this.state.ifBoth)
            },
            ifBoth: () => {
                if (this.state.authToken) {
                    this.setState({ both: !this.state.both})
                }
            },
            handleDeleteNote: noteId => {
                fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": `bearer ${TokenService.getAuthToken()}`
                    },
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.status)
                    }
                    return response.json()
                })
                .then(noteId => {
                    this.setState({
                        notes: this.state.notes.filter(note => note.note_id !== noteId)
                    })
                })
                .catch(error => this.setState({error}))
            },
            handleDeleteFolder: folderId => {
                fetch(`${config.API_ENDPOINT}/folders/${folderId}`, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": `bearer ${TokenService.getAuthToken()}`
                    },
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
            },        
            addFolder: folder => {
                this.setState({
                    folders: [...this.state.folders, folder]
                })
            },
            addNote: note => {
                this.setState({
                    notes: [...this.state.notes, note]
                })
            }
        }
    }

    componentDidMount() {
        const authToken = window.localStorage.getItem(config.TOKEN_KEY);
        this.state.setAuthToken(authToken);
        this.state.ifBoth();
    }

    // Render methods
    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => (
                            <NoteListNav
                                {...routeProps}
                            />
                        )}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        return <NotePageNav {...routeProps} 
                        />;
                    }}
                />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => {
                            if (!TokenService.hasAuthToken()) {
                                return (
                                <Redirect to="/login"/>
                                )
                            }
                            return (
                                <NoteListMain
                                    {...routeProps}
                                />
                            );
                        }}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        if (!TokenService.hasAuthToken()) {
                            return (
                            <Redirect to="/login"/>
                            )
                        }
                        return <NotePageMain {...routeProps} 
                        />;
                    }}
                />
                
                <Route 
                    path="/add-folder" 
                    render={(routeProps) => {
                        if (!TokenService.hasAuthToken()) {
                            return (
                            <Redirect to="/login"/>
                            )
                        }
                        return <AddFolderForm {...routeProps}/>
                    }}
                />

                <Route 
                    path="/add-note" 
                    render={(routeProps) => {
                        if (!TokenService.hasAuthToken()) {
                            return (
                            <Redirect to="/login"/>
                            )
                        }
                        return <AddNoteForm {...routeProps}/>
                    }}
                />

                <Route path="/login" component={LoginPage}/>
                <Route path="/register" component={RegisterPage}/>
            </>
        );
    }

    render() {
        
        return (
          <MainContext.Provider value={this.state}>
            <div className="App">
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                        <FontAwesomeIcon icon="check-double" />
                    </h1>
                    <button className='logout' onClick={() => {
                        TokenService.clearAuthToken();
                        this.setState({authToken:null,folders:[],notes:[]})
                    }}>
                        <Link to="/login">Log out</Link>
                    </button>
                </header>

                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
        </MainContext.Provider>
        );
    }
}