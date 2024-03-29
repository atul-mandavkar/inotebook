import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/note/noteContext";
import Noteitems from "./Noteitems";
// Removing all Note related code from Home component and paste here
import AddNote from "./AddNote"; // Adding AddNote component here
import { useHistory } from "react-router-dom";

function Note(props) {
  const [note, setNote] = useState({
    id: "",
    titleName: "",
    descriptionName: "",
    tagName: "General",
  }); // temporary state is created to use note for modal values and id is also included as editNote from context requires

  const history = useHistory();
  const context = useContext(noteContext); // using useContext for notes
  const { notes, getNotes, editNote } = context; // desctructring the notes and getNotes and editNote from context
  // to show the existing notes in database when page load we used useEffect and useEffect has getNotes function which get all notes in database
  useEffect(() => {
    // to make useEffect runs only once we used following technique (function inside of function in useEffect)
    const fetchNotes = () => {
      if (localStorage.getItem("token")) {
        // if token is available in local storage of web browser then show notes of that user
        // Fetch notes using the getNotes function
        getNotes();
      } else {
        // else redirect to login page (No one can access note before login)
        history.push("/login");
      }
    };

    // Call the fetchNotes function
    fetchNotes();
    
  }, [getNotes, history]);

  const updateNote = (currentNote) => {
    ref.current.click(); // button for opening modal is clicked automatically
    setNote({
      id: currentNote._id,
      titleName: currentNote.title,
      descriptionName: currentNote.description,
      tagName: currentNote.tag,
    }); // set value for note to show in modal and value is get from currentNote argument send back by child component NoteItem.js (edit icon part)
  };
  const ref = useRef(null); // ref is created to handle button click automatically and set to null initially
  const refClose = useRef(null); // refClose is created to close the modal after click on update button

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }); // simple trick to update input note when data is entered in it
  };
  const handleClick = (e) => {
    // this method is created for handling part after update button of update note is clicked
    // e.preventDefault(); // not neede prevent default as update button is outside of modal
    editNote(note.id, note.titleName, note.descriptionName, note.tagName); // we call editNote function of contest and passed id, title, description and tag as arguments
    props.showAlert("Note updated successfully!", "success"); // showing positive alert using props
    refClose.current.click(); // handleClick of update button can cause to click on close button by this reference
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      {/* forwarding showAlert as props to AddNote component */}
      {/* Modal component from bootstrap in Note.js because to handle each modal according to each note and Note.js has map method which pass notes */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@mdo"
      >
        Open modal for @mdo
      </button>
      {/* ref is added in button to get click automatically using updateNote function and display none is added to hide the button */}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {/* added name property in all three input tags and value and onchange method also */}
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="titleName" className="col-form-label">
                    Title:
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    id="titleName"
                    name="titleName"
                    value={note.titleName}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="descriptionName" className="col-form-label">
                    Description:
                  </label>
                  <textarea
                    autoComplete="off"
                    className="form-control"
                    id="descriptionName"
                    name="descriptionName"
                    value={note.descriptionName}
                    onChange={onChange}
                  />
                  {/* Replaced input text to textara tag for description */}
                </div>
                <div className="mb-3">
                  <label htmlFor="tagName" className="col-form-label">
                    Tag:
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    id="tagName"
                    name="tagName"
                    value={note.tagName}
                    onChange={onChange}
                  />
                  {/* In each input field, the autoComplete attribute is set to "off", indicating that browser autocomplete should be turned off for these fields. Since the fields are for inputting unique data such as title, description, and tag, it's appropriate to disable autocomplete to prevent the browser from suggesting previously entered values, which might not be relevant in this context.
                      By providing autoComplete="off", you ensure that the browser doesn't interfere with the input fields in the modal, allowing users to enter data without any unexpected suggestions or interference from browser autofill.
                   */}
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {/* Set ref to refClose to close modal after click on update button (to work as close button) as update button call the handleClick function we do from that function */}
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={
                  note.titleName.length <= 0 ||
                  note.descriptionName.length <= 0 ||
                  note.tagName <= 0
                }
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        {/* Making it row property which contain Noteitem as child in columns */}
        <h2>Your Notes: </h2>
        {notes.length === 0 && (
          <div className="container text-center mt-5 text-body-tertiary">
            <h2>No note available</h2>
          </div>
        )}
        {/* if no notes in database then show this message */}
        {notes.map((note, i) => {
          /* map function required to set key to each mapping element (Here i is key), so that each Noteitem component has unique key */
          return (
            <Noteitems
              note={note}
              key={i}
              showAlert={props.showAlert}
              updateNote={updateNote}
            /> /* updateNote function is added to handle click of button automatically */
            /* forwarding showAlert as props to NoteItems component */
          ); /* returning newlycreated Noteitem component which contain note information which is send as props to Noteitem component */
        })}
      </div>
    </>
  );
}

export default Note;
