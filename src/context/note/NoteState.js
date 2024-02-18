import NoteContext from "./noteContext";
import { useState, useCallback } from "react";

const NoteState = (props) => {
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial); // using useNote to set state of notes
  const hostName = "https://inotebook-backend-1bh4.onrender.com"; //"http://localhost:5000"; // make a variable which contain a common string used for path for fetch method

  // get all notes function which take no argument because fetchAllNotes api not use any content from body of html
  // By using useCallback with an empty dependency array, you ensure that getNotes remains the same function reference across renders. This should prevent the infinite loop in your Note component.
  const getNotes = useCallback(async () => {
    try {
      // Default options are marked with *
      const response = await fetch(`${hostName}/api/note/fetchAllNotes`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "auth-token":
            localStorage.getItem('token'),
          // 'auth-token' : "authentication token created when user login  (Here we removed the hardcode form of token and take the token from local storage of web page which is saved at login or signup time"
        },
      });
      if (!response.ok) {
        // Check for HTTP error status
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const json = await response.json(); // parses JSON response into native JavaScript objects
      //console.log(json);
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes ", error.message);
    }
  }, []);

  // Add note function takes three argument title and description
  const addNote = useCallback(
    async (title, description, tag) => {
      try {
        // Default options are marked with *
        const response = await fetch(`${hostName}/api/note/addNote`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            "auth-token":
              localStorage.getItem('token'),
            // 'auth-token' : "authentication token created when user login  (Here we removed the hardcode form of token and take the token from local storage of web page which is saved at login or signup time"
          },
          body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
        });
        if (!response.ok) {
          // Check for HTTP error status
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("Adding the note successfully");
        getNotes(); // Call getNotes function to show note added in browser directly
      } catch (error) {
        console.error("Error adding notes ", error.message);
      }
    },
    [getNotes]
  ); // This code is appropriate, and you don't need to make any changes unless you have specific reasons to use useCallback. If the getNotes function is stable and doesn't change between renders, you can keep it as is.

  // Delete note method take id as parameter for which to perform deletion
  const deleteNote = useCallback(
    async (id) => {
      try {
        // Default options are marked with *
        const response = await fetch(`${hostName}/api/note/deleteNote/${id}`, {
          method: "DELETE", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            "auth-token":
              localStorage.getItem('token'),
            // 'auth-token' : "authentication token created when user login  (Here we removed the hardcode form of token and take the token from local storage of web page which is saved at login or signup time"
          },
        });
        if (!response.ok) {
          // Check for HTTP error status
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("Deleting the note successfully");
        getNotes(); // Call getNotes function to show note added in browser directly
      } catch (error) {
        console.error("Error deleting notes ", error.message);
      }
    },
    [getNotes]
  );
  
  // Edit note
  const editNote = useCallback(
    async (id, title, description, tag) => {
      try {
        // Default options are marked with *
        const response = await fetch(`${hostName}/api/note/updateNote/${id}`, {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            "auth-token":
              localStorage.getItem('token'),
            // 'auth-token' : "authentication token created when user login  (Here we removed the hardcode form of token and take the token from local storage of web page which is saved at login or signup time"
          },
          body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
        });
        if (!response.ok) {
          // Check for HTTP error status
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("Updating the note successfully");
        getNotes(); // Call getNotes function to show note updated in browser directly
      } catch (error) {
        console.error("Error updating notes ", error.message);
      }
    },
    [getNotes]
  );
// In above three fuctions we do not use separate code for front end to store and show changes , instead we call getNotes function at the end of all three fuctions (like addNote, editNote , deleteNote) as a dependency to useCallback function which memorize note state 

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
