import React from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();
  return (
    <nav id="navbar">
      <div id="logo-container">
        <Link to="/">
          <img src={logo} alt="movieium logo" id="logo-img" />
          <span id="logo-title">Movieium</span>
        </Link>
      </div>
      <div id="auth-links">
        {!props.user.isLoggedIn ? (
          <>
            <Link to="/login" id="login-btn" className="auth-btn">
              Log In
            </Link>
            <Link to="/signup" id="signup-btn" className="auth-btn">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <span id="greeting-text">{`Hello, ${
              props.user.name.split(" ")[0]
            }`}</span>
            <Link to="/tickets" id="nav-link">
              Your Tickets
            </Link>
            <button
              className="auth-btn"
              onClick={() => {
                props.logoutUser();
                navigate("/");
              }}
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
