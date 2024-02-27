import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/note/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null); // created state for storing alert data
  const showAlert = (message, type) => {
    // This function handle alert msg and tyoe and also close the error after sometimes (here 3 mins)
    setAlert({ msg: message, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <>
      <NoteState>
        {/* wrap all code inside NoteState component so that each component can use contex api */}
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home showAlert={showAlert} />
                {/* passing showAlert as props to Home component */}
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login showAlert={showAlert} />
                {/* passing showAlert as props to Login component */}
              </Route>
              <Route exact path="/signup">
                <Signup showAlert={showAlert} />
                {/* passing showAlert as props to Signup component */}
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
