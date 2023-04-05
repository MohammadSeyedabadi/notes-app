import React from 'react'
//it starts with a ./ which indicate that it is one of our own components
import Sidebar from './components/Sidebar'
import Editor from './components/Editor'
import { data } from './data'
import Split from 'react-split'
import { nanoid } from 'nanoid'
// any time, any state changes like adding a new note, the entire App component get re-rendered
export default function App() {
    // we do () => so it doesn't reach into localStorage on every single re-render of the App component
    const [notes, setNotes] = React.useState(
        () => JSON.parse(localStorage.getItem("notes")) || []
        //localStorage.get("notes") => getting (pulling) the item with key of notes
        //if this localStorage.getItem("notes"))  doesnt exist it returns null which is a falsy value so then we have []
        // because localStorage.get("notes") is a stringify value we use JSON.parse on it so it turn back to javascript
    )
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ''
  )
  //in order to interact with the local storage, every time the notes array changes, we will want to set up a side effect in react
  React.useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))//'notes'=> because we are updating notes inside of local storage... JSON.stringify(notes)=> to stringify the notes so my array can turn into a string and succsessfully save to local storage 
  }, [notes])

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    }
    setNotes((prevNotes) => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
  }
  //save in state any changes make to the note that we create
  function updateNote(text) {
    setNotes((oldNotes) =>
      oldNotes.map((oldNote) => {
        return oldNote.id === currentNoteId
          ? { ...oldNote, body: text }
          : oldNote
      })
    )
  }

  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId
      }) || notes[0]
    )
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  )
}
//on evey single re-render of the App component,on the background it is iqnoring the the state that is trying to 
// re-initialize here, but if there is code such as running a console.log() or in our example getting something
//from local storage localStorage.getItem, it is going to run that code again, even if it doesnt use the value as
// its new initial state because it is maintaing that state elsewhere in the background
//ReactJS created a way to fix this. it is call lazy state initialization.
//All you have to do is, instead of providing a value, i can provide a function that returns a value
// const [state, setState] = React.useState(
//     function() { 
//         return console.log("State initialization")
//     }
// )
///////////////////////////////////////////////////////////////////////////////////////
// const [state, setState] = React.useState(
//     () => console.log("State initialization")
// )