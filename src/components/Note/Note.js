import React, { Component } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Note.css";
import MainContext from "../../contexts/MainContext";

export default class Note extends Component {
  static contextType = MainContext;

  handleDeleteNote(value) {
    this.context.handleDeleteNote(value);
    this.context.removeNote(value)
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="Note">
        <h2 className="Note__title">
          <Link to={`/note/${this.props.id}`}>{this.props.name}</Link>
        </h2>
        <button
          className="Note__delete"
          type="button"
          onClick={() => this.handleDeleteNote(this.props.id)}
        >
          <FontAwesomeIcon icon="trash-alt" /> remove
        </button>
        <div className="Note__dates">
          <div className="Note__dates-modified">
            Modified{" "}
            <span className="Date">
              {format(this.props.modified.slice(0, 10), "Do MMM")}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
