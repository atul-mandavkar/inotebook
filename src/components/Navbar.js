import React, {useEffect} from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

function Navbar() {
  const history = useHistory(); // to use useHistory hook

  let location = useLocation();
  useEffect(() => {
    //console.log(location.pathname);
  }, [location]);

  const handleLogout = () => { // handle logout fuction when logout button pressed
    localStorage.removeItem('token'); // This line removed the  stored token of user from storage of web browser
    history.push("/login"); // after removin token we redirect the page to login page by default because no token is available in web local storage
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem('token') ? <form className="d-flex">
            <Link className="btn btn-primary mx-1" role="button" to="/login">
              Login
            </Link>
            <Link className="btn btn-primary mx-1" role="button" to="/signup">
              Signup
            </Link>
          </form> : <form className="d-flex">
            <Link className="btn btn-primary mx-1" role="button" to="/login" onClick={handleLogout} >
              Logout
            </Link>
            </form>}{/* when there is token available in browser then logout button display and when no token is available then sinup and login button should display */}
          {/* two buttons are added using anchor tag then anchor tag is converted to Link tag and href property is converted in to property because we use Link of router-dom in Navbar component */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
