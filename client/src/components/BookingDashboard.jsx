import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BookingDashboard = (props) => {
  const navigate = useNavigate();
  const [movieShows, setMovieShows] = useState([]);

  const fetchMovieShows = async () => {
    const response = await fetch(`${props.host}/api/movies/getshows`);
    const jsonResponse = await response.json();

    setMovieShows(jsonResponse);
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
    if (!props.user.isLoggedIn) {
      navigate("/login");
    }
    fetchMovieShows();
  }, []);

  return (
    <div id="booking-dashboard">
      <h2 id="booking-title">Book Ticket</h2>
      <table id="show-table">
        <thead>
          <tr>
            <th>Movie</th>
            <th>Date/Time</th>
            <th>Available Seats</th>
            <th>Ticket Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movieShows.map((show) => {
            return (
              <tr key={show._id}>
                <td>{show.movie}</td>
                <td>{formatDateTime(show.date)}</td>
                <td>{show.seats}</td>
                <td>&#8377;{show.ticket_price}</td>
                <td>
                  <Link to={`/ticket/${show._id}`} className="book-btn">
                    Book Ticket
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BookingDashboard;
