import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Login(props) {
  const history = useHistory(); // This line uses the useHistory hook from react-router-dom to access the history object, which allows you to manage navigation history.
  const [credentials, setCredentials] = useState({ email: "", password: "" }); // state is created which having initially an object with email and password to blank

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Default options are marked with *
    const response = await fetch(
      "https://inotebook-backend-1bh4.onrender.com/api/auth/login",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }), // body data type must match "Content-Type" header
      }
    );
    //console.log("Login successfully");
    const json = await response.json();
    //console.log(json);
    if (json.success) {
      // redirect to home page when json.success is true
      // save the auth-token and redirect
      localStorage.setItem("token", json.token); // The localStorage is a simple key-value store that allows web applications to store data persistently in a web browser.
      props.showAlert("Logged in successfully!", "success"); // showing positive alert through props
      history.push("/"); // This line navigates the user to the root ("/") of the application if get success as true
    } else {
      //alert("Invalid credentials, please try agian !");
      props.showAlert("Invalid details", "danger"); // showing negative alert through props
    }
  };

  const onChange = (e) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.name]: e.target.value,
    })); // here we make changes in state by using name and value property of input fields, so make sure your input field should have both name and value and ofcourse onchange fuction
  };

  return (
    <div>
      <h2 className="my-3 text-center">Login to iNotebook</h2>
      <div className="container bg-dark-subtle" style={{ maxWidth: "600px" }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fs-2 fw-bold">
              Email:
            </label>
            <input
              autoComplete="email"
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              autoFocus
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fs-2 fw-bold">
              Password:
            </label>
            <input
              autoComplete="current-password"
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
            {/* autoComplete is added because of name or id property in both input tags of form with proper values.
                In the first input field for email, the autoComplete attribute is set to "email", indicating that it should be autofilled with an email address if available.
                In the second input field for the password, the autoComplete attribute is set to "current-password", indicating that it should be autofilled with a current password if available.
                By providing these specific autoComplete attribute values, you help the browser's autofill feature identify the type of data expected in each field, improving the user experience for your login form
            */}
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
