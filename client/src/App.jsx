import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import BookingDashboard from "./components/BookingDashboard";
import Alert from "./components/Alert";
import TicketDashboard from "./components/TicketDashboard";
import Tickets from "./components/Tickets";

const App = () => {
  const host = "https://movieium-server.vercel.app";

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

  const [alert, setAlert] = useState({ text: "", type: "" });

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

    showAlert("Logged Out Successfully.", "success");
  };

  const showAlert = (text, type) => {
    setAlert({ text, type });
    setTimeout(() => {
      setAlert({ text: "", type: "" });
    }, 2000);
  };

  const formatDateTime = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dateObj = new Date(date);

    const formattedString = `${dateObj.getDate()} ${
      months[dateObj.getMonth()]
    } / ${dateObj.getHours()}:${
      dateObj.getMinutes() < 10
        ? "0" + dateObj.getMinutes()
        : dateObj.getMinutes()
    }`;

    return formattedString;
  };

  useEffect(() => {
    if (localStorage.getItem("auth-token--movieium")) {
      loginUser();
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar user={user} logoutUser={logoutUser} />
      {alert.text && <Alert alert={alert} />}
      <Routes>
        <Route
          path="/"
          element={
            <Home host={host} movies={movies} fetchAllMovies={fetchAllMovies} />
          }
        />
        <Route
          path="/login"
          element={
            <Login host={host} loginUser={loginUser} showAlert={showAlert} />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup host={host} loginUser={loginUser} showAlert={showAlert} />
          }
        />
        <Route
          path="/adminlogin"
          element={
            <AdminLogin
              host={host}
              setAdminLogin={setAdminLogin}
              showAlert={showAlert}
            />
          }
        />
        <Route
          path="/admindashboard"
          element={
            <AdminDashboard
              host={host}
              adminLogin={adminLogin}
              movies={movies}
              fetchAllMovies={fetchAllMovies}
              showAlert={showAlert}
            />
          }
        />
        <Route
          path="/bookingdashboard"
          element={
            <BookingDashboard
              host={host}
              user={user}
              formatDateTime={formatDateTime}
            />
          }
        />
        <Route
          path="ticket/:showId"
          element={
            <TicketDashboard
              host={host}
              user={user}
              showAlert={showAlert}
              formatDateTime={formatDateTime}
            />
          }
        />
        <Route
          path="/tickets"
          element={
            <Tickets host={host} user={user} formatDateTime={formatDateTime} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
