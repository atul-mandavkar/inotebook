import React, { useContext } from "react";
import noteContext from "../context/note/noteContext";
// noteContext is imported to use contex here 

function Noteitems(props) {
  const context = useContext(noteContext); 
  const {deleteNote} = context; // Here we only use deleteNote function from context not other function from context
  const handleDelete = (e) => { // handleDelete function is created who call deleteNote from context and pass current working note id as argument
    e.preventDefault();
    //console.log("id is : ", note._id);
    deleteNote(note._id);
  }
  const { note } = props; // destructure note from props send by Note component
  return (
    <div className="col-md-3 my-3">
      {" "}
      {/* code of card is copied from bootstrap and removed unneccessarty part also set outer of card in column class */}
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center"> {/* Flex is used to set all three element in one line and h5 is block element so used flex */}
            <h5 className="card-title flex-grow-1">{note.title}</h5>
            <i className="fa-regular fa-trash-can mx-2" onClick={handleDelete}></i> {/* Fontawesome for delete button */}
            <i className="fa-regular fa-pen-to-square mx-2"></i> {/* Fontawesome for edit button */}
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Noteitems;
