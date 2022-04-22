import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import BookingDashboard from "./components/BookingDashboard";

const App = () => {
  const host = "http://localhost:5000";

  const [user, setUser] = useState({
    isLoggedIn: false,
    name: "Stranger",
    email: "",
    phone_no: "",
  });

  const [adminLogin, setAdminLogin] = useState({
    status: false,
    password: "",
  });

  const [movies, setMovies] = useState([]);

  const fetchAllMovies = async () => {
    const response = await fetch(`${host}/api/movies/getall`);
    const jsonResponse = await response.json();

    setMovies(jsonResponse);
  };

  const loginUser = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "auth-token": localStorage.getItem("auth-token--movieium"),
      },
    });
    const jsonResponse = await response.json();

    setUser({
      isLoggedIn: true,
      ...jsonResponse,
    });
  };

  const logoutUser = () => {
    localStorage.removeItem("auth-token--movieium");

    setUser({
      isLoggedIn: false,
      name: "Stranger",
      email: "",
      phone_no: "",
    });
  };

  useEffect(() => {
    if (localStorage.getItem("auth-token--movieium")) {
      loginUser();
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar user={user} logoutUser={logoutUser} />
      <Routes>
        <Route
          path="/"
          element={
            <Home host={host} movies={movies} fetchAllMovies={fetchAllMovies} />
          }
        />
        <Route
          path="/login"
          element={<Login host={host} loginUser={loginUser} />}
        />
        <Route
          path="/signup"
          element={<Signup host={host} loginUser={loginUser} />}
        />
        <Route
          path="/adminlogin"
          element={<AdminLogin host={host} setAdminLogin={setAdminLogin} />}
        />
        <Route
          path="/admindashboard"
          element={
            <AdminDashboard
              host={host}
              adminLogin={adminLogin}
              movies={movies}
              fetchAllMovies={fetchAllMovies}
            />
          }
        />
        <Route path="/bookingdashboard" element={<BookingDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
