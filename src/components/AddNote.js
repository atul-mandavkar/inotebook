import React, {useContext, useState} from "react";
import noteContext from "../context/note/noteContext";
// Move code for add note from Home component and make new component named AddNote

function AddNote() {
  const context = useContext(noteContext); // using useContext for notes
  const {addNote } = context; // desctructring the addNote from context, addNote is used here

  const [note, setNote] = useState({title: "", description: "", tag: "General"}); // temporary state is created to use note
  
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag); // When submit pressed then addNote function from context is called to add new note
  }
  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value}); // simple trick to update input note when data is entered in it
  }

  // made some changes in return function content
  return (
    <div>
      <div className="container my-3 bg-secondary-subtle">
        <h2>Add Note: </h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Note Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="titleHelp"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Note Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNote;
