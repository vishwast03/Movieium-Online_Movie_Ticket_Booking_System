import React from "react";
import { Link } from "react-router-dom";
import RunningMovies from "./RunningMovies";

const Home = (props) => {
  return (
    <main id="home">
      <h1 id="home-title">book tickets for your favourite movies online</h1>
      <Link to="bookingdashboard" id="ticket-link">
        Book Now !
      </Link>
      {/* <Link to="/adminlogin">Admin Login</Link> */}
      <RunningMovies
        host={props.host}
        movies={props.movies}
        fetchAllMovies={props.fetchAllMovies}
      />
    </main>
  );
};

export default Home;
