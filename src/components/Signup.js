import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Signup(props) {
  const [showPassword, setShowPassword] = useState(false); // creating a state to toggle between password visibility or hide it without disturbing security of user
  const history = useHistory(); // This line uses the useHistory hook from react-router-dom to access the history object, which allows you to manage navigation history.
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  }); // state is created which having initially an object with name, email and password, cpassword to blank
  const { name, email, password, cpassword } = credentials; // destructuring from credentials object
  const hostName = process.env.REACT_APP_BACKEND_URL; // making backend url as env variable
  //console.log(hostName);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Default options are marked with *
      const response = await fetch(
        `${hostName}/api/auth/createUser`,
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }), // body data type must match "Content-Type" header
        }
      );

      if (!response.ok) {
        // Check for HTTP error status
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      //console.log("Login successfully");
      const json = await response.json();
      //console.log(json);
      if (json.success) {
        // redirect to home page when json.success is true
        // save the auth-token and redirect
        localStorage.setItem("token", json.token); // The localStorage is a simple key-value store that allows web applications to store data persistently in a web browser.
        props.showAlert("Created account successfully!", "success"); // showing positive alert using props
        history.push("/"); // This line navigates the user to the root ("/") of the application if get success as true
      } else {
        //alert("Invalid credentials"); // This else block of if never execute because of try catch block we used if error occurred then directly alert of catch execute not this block's alert. Actually no need to use try catch block here, but we did for coading purpose.
        props.showAlert("Invalid credentials", "danger"); // showing negative alett using props
      }
    } catch (error) {
      // No need to use this try catch here, I only used for coding purpose.
      console.error("Error in signup", error.message);
      //alert("An error occurred during signup. Please try again later.");
      props.showAlert(
        "An error occurred during signup, Please try again later",
        "danger"
      ); // showing negative alert using props
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
      <h2 className="my-3 text-center">Create an account</h2>
      <div className="container bg-dark-subtle" style={{ maxWidth: "600px" }}>
        <form onSubmit={handleSubmit}>
          {/* because of onSubmit we can used required and minLength property in tag */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label fs-2 fw-bold">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fs-2 fw-bold">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
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
              value={password}
              onChange={onChange}
              minLength={8}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label fs-2 fw-bold">
              Confirm Password:
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="cpassword"
                name="cpassword"
                value={cpassword}
                onChange={onChange}
                minLength={8}
                required
              />
              <span className="input-group-text">
                <i
                  className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </span>
            </div>
            {/* Creating and eye icon using font awesome to show the password for user's verification without disturbing security */}
            {/* we also group input tag and i tag inside bootstrap div class input-group (to group input tag and span tag of input-group-text class who contain i tag), and set type of input to toggle between text and password using state variable */}
            {cpassword.length > 0 && password !== cpassword && (
              <span className="container text-light bg-danger font-monospace">
                Confirm Passwords do not match
              </span>
            )}{" "}
            {/* Showing warning when both password and confirm password not match each other */}
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!name | !email | !password | (password !== cpassword)}
          >
            {/* Here only need to check password match, no need of other checks (as we used required in input fields), but I used for coding purpose */}
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
