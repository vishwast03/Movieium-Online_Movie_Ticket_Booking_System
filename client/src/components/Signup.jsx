import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = (props) => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const createNewUser = async (e) => {
    e.preventDefault();

    if (credentials.password === credentials.cpassword) {
      const response = await fetch(`${props.host}/api/auth/createuser`, {
        method: "POST",
        body: JSON.stringify({ ...credentials }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const jsonResponse = await response.json();

      if (jsonResponse.success) {
        props.showAlert("Accout created successfully.", "success");

        localStorage.setItem("auth-token--movieium", jsonResponse.authToken);

        props.loginUser();

        navigate("/");
      } else {
        props.showAlert("E-mail already taken", "warning");
      }
    } else {
      props.showAlert(
        `"Password" and "Confirm Password" should match`,
        "warning"
      );
    }
  };

  return (
    <div id="form-container">
      <h2 id="form-title">Sign Up</h2>
      <form id="signup-form" className="auth-form" onSubmit={createNewUser}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          required
          value={credentials.name}
          onChange={handleChange}
        />
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
          type="tel"
          name="phone"
          id="phone"
          placeholder="Phone Number"
          required
          value={credentials.phone}
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
        <input
          type="password"
          name="cpassword"
          id="cpassword"
          placeholder="Confirm Password"
          required
          value={credentials.cpassword}
          onChange={handleChange}
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
