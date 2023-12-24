import React, { useContext } from "react";
import noteContext from "../context/note/noteContext";
import Noteitems from "./Noteitems";
// Removing all Note related code from Home component and paste here

function Note() {
  const context = useContext(noteContext); // using useContext for notes
  const { notes, setNotes } = context; // desctructring the notes and setNoes from context
  console.log(setNotes);

  return (
    <div className="row my-3"> { /* Making it row property which contain Noteitem as child in columns */}
      <h2>Your Notes: </h2>
      {notes.map((note, i) => { /* map function required to set key to each mapping element (Here i is key), so that each Noteitem component has unique key */
        return <Noteitems note={note} key={i} />; /* returning newlycreated Noteitem component which contain note information which is send as props to Noteitem component */
      })}
      
    </div>
  );
}

export default Note;
