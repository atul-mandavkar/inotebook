import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory(); // This line uses the useHistory hook from react-router-dom to access the history object, which allows you to manage navigation history.
  const [credentials, setCredentials] = useState({ email: "", password: "" }); // state is created which having initially an object with email and password to blank

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Default options are marked with *
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }), // body data type must match "Content-Type" header
    });
    //console.log("Login successfully");
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // redirect to home page when json.success is true
      // save the auth-token and redirect
      localStorage.setItem("token", json.authtoken); // The localStorage is a simple key-value store that allows web applications to store data persistently in a web browser.
      history.push("/"); // This line navigates the user to the root ("/") of the application if get success as true
    } else {
      alert("Invalid credentials");
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
      <div className="container bg-dark-subtle" style={{ maxWidth: "600px" }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fs-2 fw-bold">
              Email:
            </label>
            <input
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
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
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
