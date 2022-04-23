import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import RunningMovies from "./RunningMovies";

const Home = (props) => {
  return (
    <main id="home">
      <h1 id="home-title">book tickets for your favourite movies online</h1>
      <Link to="bookingdashboard" id="ticket-link">
        Book Now !
      </Link>
      <RunningMovies
        host={props.host}
        movies={props.movies}
        fetchAllMovies={props.fetchAllMovies}
      />
      <Footer />
    </main>
  );
};

export default Home;
