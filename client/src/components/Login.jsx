import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div id="form-container">
      <h2 id="form-title">Log In</h2>
      <form id="login-form" className="auth-form">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="E-mail"
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
        />
        <button type="submit">Log In</button>
      </form>
      <div id="help-text">
        Don't have an account? <Link to="/signup">Sign Up.</Link>
      </div>
    </div>
  );
};

export default Login;
