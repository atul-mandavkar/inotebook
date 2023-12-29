import React, { useContext, useEffect } from "react";
import noteContext from "../context/note/noteContext";
import Noteitems from "./Noteitems";
// Removing all Note related code from Home component and paste here
import AddNote from "./AddNote"; // Adding AddNote component here

function Note() {
  const context = useContext(noteContext); // using useContext for notes
  const { notes, getNotes} = context; // desctructring the notes and getNotes from context
  // to show the existing notes in database when page load we used useEffect and useEffect has getNotes function which get all notes in database
  useEffect(() => { // to make useEffect runs only once we used following technique (function inside of function in useEffect)
    const fetchNotes = () => {
      // Fetch notes using the getNotes function
      getNotes();
    };

    // Call the fetchNotes function
    fetchNotes();
  },[getNotes])

  return (
    <>
      <AddNote />
      <div className="row my-3">
        {/* Making it row property which contain Noteitem as child in columns */}
        <h2>Your Notes: </h2>
        {notes.map((note, i) => {
          /* map function required to set key to each mapping element (Here i is key), so that each Noteitem component has unique key */
          return (
            <Noteitems note={note} key={i} />
          ); /* returning newlycreated Noteitem component which contain note information which is send as props to Noteitem component */
        })}
      </div>
    </>
  );
}

export default Note;
