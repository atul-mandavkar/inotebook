import React, {useContext, useEffect} from 'react'; // import useContext
import noteContext from '../context/note/noteContext'; // import noteContext

function About() {
  const a = useContext(noteContext); // using a created context noteContext
  useEffect(()=> {
    a.update();
  }); // useEffect is used to set the state change happens in update function of NoteState
  return (
    <div>
      This is about section {a.state.name} and he is in {a.state.class}. {/*using value or state value in noteContext*/}
    </div>
  )
}

export default About;