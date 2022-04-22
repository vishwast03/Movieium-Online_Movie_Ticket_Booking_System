import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = (props) => {
  const navigate = useNavigate();
  const [addOption, setAddOption] = useState("movie-show");
  const [movieDetails, setMovieDetails] = useState({
    title: "",
    desc: "",
    stars: "",
    poster_link: "",
  });

  useEffect(() => {
    // if (!props.adminLogin.status) {
    //   navigate("/adminlogin");
    // }
    props.fetchAllMovies();
  }, []);

  const handleChange = (e) => {
    setAddOption(e.target.value);
  };

  const handleMovieChange = (e) => {
    setMovieDetails({ ...movieDetails, [e.target.name]: e.target.value });
  };

  const handleMovieSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${props.host}/api/movies/addmovie`, {
      method: "POST",
      body: JSON.stringify({ ...movieDetails }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "admin-password": props.adminLogin.password,
      },
    });
    const jsonResponse = await response.json();
    // TODO: Alert Success

    setMovieDetails({
      title: "",
      desc: "",
      stars: "",
      poster_link: "",
    });
  };

  return (
    <div id="admin-dashboard">
      <h2 id="dashboard-title">Admin Dashboard</h2>
      <div id="select-container">
        <label htmlFor="dropdown-select">Add Movie Show/Movie: </label>
        <select
          name="add-option"
          id="dropdown-select"
          value={addOption}
          onChange={handleChange}
        >
          <option value="movie">Movie</option>
          <option value="movie-show">Movie Show</option>
        </select>
      </div>
      {addOption === "movie" ? (
        <div className="add-form-container">
          <h2 className="add-form-title">Add Movie</h2>
          <form className="add-form" onSubmit={handleMovieSubmit}>
            <input
              type="text"
              name="title"
              id="movie-title"
              placeholder="Title"
              required
              value={movieDetails.title}
              onChange={handleMovieChange}
            />
            <input
              type="text"
              name="desc"
              id="movie-desc"
              placeholder="Description"
              required
              value={movieDetails.desc}
              onChange={handleMovieChange}
            />
            <input
              type="text"
              name="stars"
              id="movie-stars"
              placeholder="Stars"
              required
              value={movieDetails.stars}
              onChange={handleMovieChange}
            />
            <input
              type="text"
              name="poster_link"
              id="poster-link"
              placeholder="Poster Link"
              required
              value={movieDetails.poster_link}
              onChange={handleMovieChange}
            />
            <button type="submit">Add Movie</button>
          </form>
        </div>
      ) : (
        <div className="add-form-container">
          <h2 className="add-form-title">Add Movie Show</h2>
          <form className="add-form">
            <input type="date" name="show-date" id="show-date" required />
            <input type="time" name="show-time" id="show-time" required />
            <input
              type="number"
              name="seats"
              id="seats"
              placeholder="Seats"
              required
            />
            <input
              type="text"
              name="movie"
              id="movie"
              placeholder="Movie"
              required
            />
            <select name="movies" id="movies">
              {props.movies.map((movie) => {
                return (
                  <option key={movie._id} value={movie.title}>
                    {movie.title}
                  </option>
                );
              })}
            </select>
            <button type="submit">Add Movie Show</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
