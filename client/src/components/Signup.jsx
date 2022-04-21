import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div id="form-container">
      <h2 id="form-title">Sign Up</h2>
      <form id="signup-form" className="auth-form">
        <input type="text" name="name" id="name" placeholder="Name" required />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="E-mail"
          required
        />
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder="Phone Number"
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
        />
        <input
          type="password"
          name="cpassword"
          id="cpassword"
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <div id="help-text">
        Already have an account? <Link to="/login">Log In.</Link>
      </div>
    </div>
  );
};

export default Signup;
