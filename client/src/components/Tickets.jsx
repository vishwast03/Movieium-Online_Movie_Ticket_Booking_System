import React, { useEffect, useState } from "react";

const Tickets = (props) => {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {};

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div>
      <table id="show-table">
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Ticket Id</th>
            <th>Movie</th>
            <th>Ticket Price</th>
          </tr>
        </thead>
        {/* <tbody>
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
        </tbody> */}
      </table>
    </div>
  );
};

export default Tickets;
