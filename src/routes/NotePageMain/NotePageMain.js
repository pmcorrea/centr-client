import React, { Component } from "react";
import Note from "../../components/Note/Note";
import "./NotePageMain.css";
import MainContext from "../../contexts/MainContext";
import { findNote } from "../../services/notes-helpers";

export default class NotePageMain extends Component {
  static contextType = MainContext;

  render() {
    const params = this.props.match.params.noteId;
    let notes = this.context.notes;
    let note;

    if (params) {
      note = notes ? findNote(notes, params) : {};
    }

    return this.context.notes.length ? (
      <section className="NotePageMain">
        <Note
          id={note.note_id}
          name={note.note_name}
          modified={note.modified}
          history={this.props.history}
        />
        <div className="NotePageMain__content">
          {note.content.split(/\n \r|\n/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>
    ) : ( "" );
  }
}

NotePageMain.defaultProps = {
  note: {
    content: ""
  }
};
