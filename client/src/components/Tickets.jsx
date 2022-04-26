import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Tickets = (props) => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  const fetchTickets = async () => {
    const response = await fetch(`${props.host}/api/ticket/getall`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "auth-token": localStorage.getItem("auth-token--movieium"),
      },
    });
    const jsonResponse = await response.json();

    setTickets(jsonResponse);
  };

  useEffect(() => {
    if (!props.user.isLoggedIn) {
      navigate("/login");
    }
    fetchTickets();
  }, []);

  return (
    <div id="ticket-display">
      <h2>Your Tickets</h2>
      <table id="show-table">
        <thead>
          <tr>
            <th>Ticket Id</th>
            <th>Show Id</th>
            <th>Show Date</th>
            <th>Movie</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => {
            return (
              <tr key={ticket._id}>
                <td>{ticket._id}</td>
                <td>{ticket.show_id}</td>
                <td>{props.formatDateTime(ticket.show_date)}</td>
                <td>{ticket.movie}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Tickets;
