import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "657b14f5c60bc5bfca1f670a",
      user: "657ad3283db15b3a927f246e",
      title: "Rawdy Rathod",
      description: "Jo mai bolta hun wo mai karta hun",
      tag: "action movie",
      date: "2023-12-14T14:45:09.398Z",
      __v: 0,
    },
    {
      _id: "657b16cef74be8e40112a80e",
      user: "657ad3283db15b3a927f246e",
      title: "Rawdy Rathod",
      description:
        "Jo mai bolta hun wo mai karta hun aur jo mai nahi bolta wo mai definately karta hun",
      tag: "action movie",
      date: "2023-12-14T14:53:02.215Z",
      __v: 0,
    },
    {
      _id: "657b14f5c60bc5bfca1f670b",
      user: "657ad3283db15b3a927f246e",
      title: "Rawdy Rathod 2",
      description: "Jo mai bolta hun wo mai karta hun",
      tag: "action movie",
      date: "2023-12-14T14:45:09.398Z",
      __v: 0,
    },
    {
      _id: "657b16cef74be8e40112a80f",
      user: "657ad3283db15b3a927f246e",
      title: "Rawdy Rathod 2",
      description:
        "Jo mai bolta hun wo mai karta hun aur jo mai nahi bolta wo mai definately karta hun",
      tag: "action movie",
      date: "2023-12-14T14:53:02.215Z",
      __v: 0,
    },
    {
      _id: "657b1a2fce89ac7029b507af",
      user: "657ad3283db15b3a927f246e",
      title: "Rawdy Rathod",
      description:
        "chikni kamar pe mera dil phisal gaya, strongly ye jaadu tera muzpe chad gaya",
      tag: "action movie",
      date: "2023-12-14T15:07:27.743Z",
      __v: 0,
    },
    {
      _id: "657c55823b50890085b150e9",
      user: "657ad3283db15b3a927f246e",
      title: "Rawdy Rathod",
      description: "chandaniya chhup jana re",
      tag: "action movie",
      date: "2023-12-15T13:32:50.039Z",
      __v: 0,
    },
  ];

  
  const [notes, setNotes] = useState(notesInitial); // using useNote to set state of notes
  
  // Add note function takes three argument title and description
  const addNote = (title, description, tag) => {
    //console.log("Adding note"); 
    // API call to do (serverside working of this method) Here _id is same for all newly created notes because it is copied from here only
    const note = {
      _id: "657c55823b50890085b150z9",
      user: "657ad3283db15b3a927f246e",
      title: title,
      description: description,
      tag: tag,
      date: "2023-12-15T13:32:50.039Z",
      __v: 0,
    }
    setNotes(notes.concat(note)); // concat method is used to add new note to original notes array (instead of push method)
  }

  // Delete note method take id as parameter for which to perform deletion
  const deleteNote = (id) => {
    //console.log("Deleted note with id : ", id);
    // API call to do (serverside working of this method) Here if we delete only one of newly created note then all newly created note gets automaticaaly delete because they all have same _id
    const newNotes = notes.filter((note) => note._id !== id); // filter method is used to ignore only that note whose id is match to id from parameter and all other notes saved in newNotes
    setNotes(newNotes); // setting newNotes in place of notes
  };

  // Edit note
  const editNote = () => {};
  
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
