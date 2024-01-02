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
    setNote({ title: "", description: "", tag: "General" }); // Empting the title and description field after adding note , kept it blank for new note
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
              value={note.title}
              aria-describedby="titleHelp"
              onChange={onChange}
              autoFocus
            />
            {/* Autofocus for first time when page reload */}
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Note Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
            />
            {/* Replaced input text to textara tag for description */}
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Note Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
            disabled={note.title.length <= 0 || note.description.length <= 0}
          >
            Add
          </button>
          {/* If title or description is empty while adding note then add button is disable */}
        </form>
      </div>
    </div>
  );
}

export default AddNote;
