import React from 'react'

export default function Sidebar(props) {
  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`title ${
          note.id === props.currentNote.id ? 'selected-note' : ''
        }`}
        onClick={() => props.setCurrentNoteId(note.id)}
      >
        <h4 className="text-snippet">{note.body.split('\n')[0]}</h4>
        <button
          className="delete-btn"
          onClick={(event) => props.deleteNote(event, note.id)}
          //if you ever need extra parameters, other than the event in
          //your callback function, then you are probably going to pass a whole callback function, instead of just calling props.deleteNote
          //so that you can pass whatever parameters you want to your own function
        >
          <i className="bi bi-trash3-fill gg-trash trash-icon"></i>
        </button>
      </div>
    </div>
  ))

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
        <button className="new-note" onClick={props.newNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  )
}
