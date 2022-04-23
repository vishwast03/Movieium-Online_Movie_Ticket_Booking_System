import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = (props) => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const loginAdmin = async (e) => {
    e.preventDefault();

    const response = await fetch(`${props.host}/api/auth/adminlogin`, {
      method: "POST",
      body: JSON.stringify({ password }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const jsonResponse = await response.json();

    if (jsonResponse.success) {
      props.showAlert("Logged In Successfully as Admin", "success");
      props.setAdminLogin({
        status: true,
        password: password,
      });
      navigate("/admindashboard");
    } else {
      props.showAlert("Incorrect Password", "danger");
    }
  };

  return (
    <div id="form-container">
      <h2 id="form-title">Admin Login</h2>
      <form id="login-form" className="auth-form" onSubmit={loginAdmin}>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
          value={password}
          onChange={handleChange}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default AdminLogin;
