import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=> {
    const s1 = {
        "name": "Atul",
        "class": "10a"
    }
    const [state, setState] = useState(s1); // using useState to set state
    const update = ()=> {
        setTimeout(() => {
            setState({
                "name": "Rahul",
                "class": "4b"
            })
        }, 1000); // in update function after 1 second change state
    }
    return (
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;