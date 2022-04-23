import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    const response = await fetch(`${props.host}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({ ...credentials }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const jsonResponse = await response.json();

    if (jsonResponse.success) {
      localStorage.setItem("auth-token--movieium", jsonResponse.authToken);

      props.showAlert("Logged In Successfully.", "success");

      props.loginUser();

      navigate("/");
    } else {
      props.showAlert("Invalid E-mail or Password", "warning");
    }
  };

  return (
    <div id="form-container">
      <h2 id="form-title">Log In</h2>
      <form id="login-form" className="auth-form" onSubmit={loginUser}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="E-mail"
          required
          value={credentials.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
          value={credentials.password}
          onChange={handleChange}
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
