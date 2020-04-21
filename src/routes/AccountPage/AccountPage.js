import React, { Component } from "react";
import "./AccountPage.css";
import AuthApiService from "../../services/auth-api-service";
import MainContext from "../../contexts/MainContext";
import TokenHelpers from "../../services/token-helpers";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class AccountPage extends Component {
  static contextType = MainContext;

  state = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    confirmUsername: "",
    visibility: "Public",
    error: null,
    currentVisibility: null,
    currentUsername: null,
    avatar: "",
  };

  setOldPassword(oldPassword) {
    this.setState({ oldPassword });
  }

  setNewPassword(newPassword) {
    this.setState({ newPassword });
  }

  setConfirmNewPassword(confirmNewPassword) {
    this.setState({ confirmNewPassword });
  }

  setConfirmUsername(confirmUsername) {
    this.setState({ confirmUsername });
  }

  setVisibility(visibility) {
    this.setState({ visibility });
  }

  handleChangePassword(e) {
    e.preventDefault();

    AuthApiService.postPasswordChange({
      token: TokenHelpers.getAuthToken(),
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword,
      confirmNewPassword: this.state.confirmNewPassword,
    })
      .then((res) => {
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ error }, () => console.log(this.state.error));
      });
  }

  handleChangeVisibility(e) {
    e.preventDefault();

    AuthApiService.postVisibilityChange({
      token: TokenHelpers.getAuthToken(),
      visibility: this.state.visibility,
    })
      .then((res) => {
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ error }, () => console.log(this.state.error));
      });
  }

  handleDeleteAccount(e) {
    e.preventDefault();

    AuthApiService.deleteAccount({
      token: TokenHelpers.getAuthToken(),
      confirmUsername: this.state.confirmUsername,
      currentUsername: this.state.currentUsername,
    })
      .then((res) => {
        this.props.history.push("/login");
      })
      .catch((error) => {
        this.setState({ error }, () => console.log(this.state.error));
      });
  }

  getUserDetailsByToken() {
    AuthApiService.getUserDetailsByToken()
      .then((result) => {
        this.setState({
          currentVisibility: result["visibility"],
          currentUsername: result["user_name"],
          avatar: result["avatar"],
        });
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  componentDidMount() {
    this.getUserDetailsByToken();
  }

  showWidget(widget) {
    widget.open();
  }

  checkUploadResult(result) {
    if (result.event === "success") {
      AuthApiService.updateAvatar(result.info.secure_url)
        .then((apiResult) => {
          // you would update the avatar on the page
          // update the account page
          this.setState({ avatar: result.info.secure_url });
        })
        .catch((error) => {
          this.setState({ error }, () => console.log(this.state.error));
        });
    }
  }

  render() {
    const { error } = this.state;
    const { currentVisibility } = this.state;

    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "pmcorrea",
        uploadPreset: "heg13zhh",
      },
      (error, result) => {
        this.checkUploadResult(result);
      }
    );

    return (
      <>
        <div className="profile_box">
          <div className="profile_subbox">
            <img
              src={this.state.avatar}
              className="profile_box_avatar"
              alt="profile avatar"
            />
            <button
              type="button"
              className="change_avatar_button"
              onClick={() => this.showWidget(widget)}
            >
              edit
            </button>
          </div>

          <Link to="/">
            <button
              className="AccountPage__logout"
              type="button"
              onClick={() => {
                TokenHelpers.clearAuthToken();
                this.setState({
                  authToken: null,
                  folders: [],
                  posts: [],
                  requests: false,
                });
              }}
            >
              <FontAwesomeIcon
                className=".AccountPage__logout"
                icon="sign-out-alt"
                size="2x"
              />
            </button>
          </Link>
        </div>

        <div className="validation_box" role="alert">
          {error && <p>{error}</p>}
        </div>

        <div className="AccountPage__forms">
          <form
            className="AccountPage__changePasswordForm"
            onSubmit={(e) => this.handleChangePassword(e)}
          >
            <input
              className="AccountPage__input"
              placeholder="old password"
              type="password"
              onChange={(e) => this.setOldPassword(e.target.value)}
            />
            <input
              className="AccountPage__input"
              placeholder="new password"
              type="password"
              onChange={(e) => this.setNewPassword(e.target.value)}
            />
            <input
              className="AccountPage__input"
              placeholder="new password"
              type="password"
              onChange={(e) => this.setConfirmNewPassword(e.target.value)}
            />
            <button className="AccountPage__button" type="submit">
              change password
            </button>
          </form>

          <form
            className="AccountPage__changeVisibilityForm"
            onSubmit={(e) => this.handleChangeVisibility(e)}
          >
            <p id="AccountPage__vis_status">
              You are currently: {currentVisibility}
            </p>
            <select
              className="AccountPage__select"
              id="changeVisibilityForm_menu"
              onChange={(e) => this.setVisibility(e.target.value)}
            >
              <option
                className="AccountPage__option"
                value="Public"
                key={"Public"}
              >
                Public
              </option>
              <option
                className="AccountPage__option"
                value="Private"
                key={"Private"}
              >
                Private
              </option>
            </select>
            <button className="AccountPage__button" type="submit">
              change visibility
            </button>
          </form>

          <form
            className="AccountPage__deleteAccountForm"
            onSubmit={(e) => this.handleDeleteAccount(e)}
          >
            <input
              className="AccountPage__input"
              placeholder="confirm username"
              onChange={(e) => this.setConfirmUsername(e.target.value)}
            />
            <button className="AccountPage__button" type="submit">
              delete account
            </button>
          </form>
        </div>
      </>
    );
  }
}
