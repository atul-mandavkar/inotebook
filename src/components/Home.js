import React from "react";
import Note from "./Note";

function Home(props) {
  const {showAlert} = props;
  return (
    <div>
      {/* Removed note related content from Home component and paste in newly created Note component and also calling Note component Here */}      
      <Note showAlert={showAlert} /> {/* forwarding showAlert as props to Note component */}
    </div>
  );
}

export default Home;
