import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TicketDashboard = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState({
    movie: "",
    date: "",
    seats: "",
    ticket_price: "",
  });

  const fetchShowDetails = async () => {
    const response = await fetch(`${props.host}/api/movies/getshowdetails`, {
      method: "POST",
      body: JSON.stringify({ showId: params.showId }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const jsonResponse = await response.json();

    setShow(jsonResponse);
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
    fetchShowDetails();
  }, []);

  return (
    <div id="ticket-dashboard">
      <h2>Get Ticket</h2>
      <div id="show-details">
        <div>
          Movie: <span>{show.movie}</span>
        </div>
        <div>
          Date: <span>{show.date && formatDateTime(show.date)}</span>
        </div>
        <div>
          Available Seats: <span>{show.seats}</span>
        </div>
        <div>
          Price: &#8377;<span>{show.ticket_price}</span>
        </div>
      </div>
    </div>
  );
};

export default TicketDashboard;
