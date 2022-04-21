import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav id="navbar">
      <div id="logo-container">
        <Link to="/">
          <img src={logo} alt="movieium logo" id="logo-img" />
          <span id="logo-title">Movieium</span>
        </Link>
      </div>
      <div id="nav-menu">
        <ul id="nav-links">
          <li className="nav-link">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-link">
            <Link to="/">About</Link>
          </li>
          <li className="nav-link">
            <Link to="/">Contact</Link>
          </li>
        </ul>
      </div>
      <div id="auth-links">
        <Link to="/login" id="login-btn">
          Log In
        </Link>
        <Link to="/signup" id="signup-btn">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
