// Libraries
import React, { Component } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Components and Routes
import LoginPage from "../routes/LoginPage/LoginPage";
import NoteListNav from "../routes/NoteListNav/NoteListNav";
import NoteListMain from "../routes/NoteListMain/NoteListMain";
import NotePageNav from "../routes/NotePageNav/NotePageNav";
import NotePageMain from "../routes/NotePageMain/NotePageMain";
import AddFolderForm from "../components/AddFolderForm/AddFolderForm";
import AddNoteForm from "../components/AddNoteForm/AddNoteForm";
import RegisterPage from "../routes/RegisterPage/RegisterPage";
import AccountPage from "../routes/AccountPage/AccountPage";
import AccountPageNav from "../routes/AccountPageNav/AccountPageNav";
import DiscoverPageNav from "../routes/DiscoverPageNav/DiscoverPageNav";
import DiscoverPage from "../routes/DiscoverPage/DiscoverPage";
import FollowingPage from "../routes/FollowingPage/FollowingPage";
import FollowingPageNav from "../routes/FollowingPageNav/FollowingPageNav";

// Contexts
import MainContext from "../contexts/MainContext";

// Helpers, services, and variables
import TokenHelpers from "../services/token-helpers";
import AuthApiService from "../services/auth-api-service";

// Style
import "./App.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      folders: [],
      notes: [],
      authToken: null,
      setAuthToken: authToken => this.setState({ authToken }),
      getData: () => {
        let token = TokenHelpers.getAuthToken();
        AuthApiService.postLogin({
            user_name: null,
            password: null,
            token: token
        })
        .then(res => {
            this.state.setFolders(res["folders"]);
            this.state.setNotes(res["notes"]);
        })
        .catch(function(error) {
            console.error(error);
        });
      },
      setNotes: notes => {
        this.setState({ notes });
      },
      setFolders: folders => {
        this.setState({ folders });
      },

    };
  }

  componentDidMount() {
    this.state.getData();
  }

  // Render methods
  renderNavRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => <NoteListNav {...routeProps} />}
          />
        ))}
        <Route
          path="/note/:noteId"
          render={routeProps => {
            return <NotePageNav {...routeProps} />;
          }}
        />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
        <Route
          path="/account"
          render={routeProps => {
            return <AccountPageNav {...routeProps} />
          }}
          />
          <Route
          path="/discover"
          render={routeProps => {
            return <DiscoverPageNav {...routeProps} />
          }}
          />

        <Route
          path="/following"
          render={routeProps => {
            return <FollowingPageNav {...routeProps} />
          }}
          />  
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              if (!TokenHelpers.hasAuthToken()) {
                return <Redirect to="/login" />;
              }
              return <NoteListMain {...routeProps} />;
            }}
          />
        ))}
        <Route
          path="/note/:noteId"
          render={routeProps => {
            if (!TokenHelpers.hasAuthToken()) {
              return <Redirect to="/login" />;
            }
            return <NotePageMain {...routeProps} />;
          }}
        />

        <Route
          path="/add-folder"
          render={routeProps => {
            if (!TokenHelpers.hasAuthToken()) {
              return <Redirect to="/login" />;
            }
            return <AddFolderForm {...routeProps} />;
          }}
        />

        <Route
          path="/add-note"
          render={routeProps => {
            if (!TokenHelpers.hasAuthToken()) {
              return <Redirect to="/login" />;
            }
            return <AddNoteForm {...routeProps} />;
          }}
        />

        <Route
          path="/account"
          render={routeProps => {
            if (!TokenHelpers.hasAuthToken()) {
              return <Redirect to="/login" />;
            }
            return <AccountPage {...routeProps} />;
          }}
        />  

        <Route
          path="/discover"
          render={routeProps => {
            if (!TokenHelpers.hasAuthToken()) {
              return <Redirect to="/login" />;
            }
            return <DiscoverPage {...routeProps} />;
          }}
        />  

          <Route
          path="/following"
          render={routeProps => {
            if (!TokenHelpers.hasAuthToken()) {
              return <Redirect to="/login" />;
            }
            return <FollowingPage {...routeProps} />;
          }}
        />  

        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </>
    );
  }

  renderFollowingButton() {
    return (
      <button
      className="following"
      >
      <Link to="/following">Following</Link>
      </button>
    )
  }

  renderDiscoverButton() {
    return (
      <button
      className="discover"
      >
      <Link to="/discover">Discover</Link>
      </button>
    )
  }

  renderAccountButton() {
    return (
      <button
      className="account"
      >
      <Link to="/account">Account</Link>
      </button>
    )
  }

  renderLogoutButton() {
    return (
      <button
      className="logout"
      onClick={() => {
        TokenHelpers.clearAuthToken();
        this.setState({ authToken: null, folders: [], notes: [] });
      }}
    >
      <Link to="/login">Log out</Link>
    </button>
    )
  }

  render() {
    return (
      <MainContext.Provider value={this.state}>
        <div className="App">
          <nav className="App__nav">{this.renderNavRoutes()}</nav>

          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{" "}
              <FontAwesomeIcon icon="check-double" />
            </h1>
            {TokenHelpers.hasAuthToken() ? this.renderFollowingButton() : ''}

            {TokenHelpers.hasAuthToken() ? this.renderDiscoverButton() : ''}

            {TokenHelpers.hasAuthToken() ? this.renderAccountButton() : ''}

            {TokenHelpers.hasAuthToken() ? this.renderLogoutButton() : ''}
          </header>

          <main className="App__main">{this.renderMainRoutes()}</main>
        </div>
      </MainContext.Provider>
    );
  }
}
