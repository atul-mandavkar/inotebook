import React, {useContext, useState} from "react";
import noteContext from "../context/note/noteContext";
// Move code for add note from Home component and make new component named AddNote

function AddNote(props) {
  const context = useContext(noteContext); // using useContext for notes
  const {addNote } = context; // desctructring the addNote from context, addNote is used here

  const [note, setNote] = useState({title: "", description: "", tag: "General"}); // temporary state is created to use note
  
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag); // When submit pressed then addNote function from context is called to add new note
    props.showAlert("Note added successfully!", "success"); // showing positive alert using props
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
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
            />
            {/* In each input field, the autoComplete attribute is set to "off" to disable the browser's autofill feature for these fields. This is commonly done for fields where user input is unique and not suitable for autofilling, such as note titles, descriptions, and tags.
                By setting autoComplete="off", you prevent the browser from suggesting previous input values for these fields, ensuring a clean and appropriate user experience for adding notes. 
            */}
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
            disabled={note.title.length < 4 || note.description.length < 8}
          >
            Add
          </button>
          {/* If title or description length is less than 4 and 8 respectively while adding note then add button is disable */}
        </form>
      </div>
    </div>
  );
}

export default AddNote;
