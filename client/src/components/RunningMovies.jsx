import React, { useEffect } from "react";

const RunningMovies = (props) => {
  useEffect(() => {
    props.fetchAllMovies();
  }, []);

  return (
    <section id="running-movies">
      <h2 className="section-title">In Theaters</h2>
      <div id="movies-container">
        {props.movies.length === 0 ? (
          <div className="dots-1"></div>
        ) : (
          props.movies.slice(0, 5).map((movie) => {
            return (
              <div key={movie.title} className="movie-card">
                <img className="movie-img" src={movie.poster_link} />
                <div className="movie-title">{movie.title}</div>
                <div className="movie-stars">{movie.stars}</div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default RunningMovies;
