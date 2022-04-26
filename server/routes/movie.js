const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const MovieShow = require("../models/MovieShow");
const authenticateAdmin = require("../middlewares/authenticateAdmin");

// ROUTE 1: Add movie using: POST /api/movies/addmovie - Admin Login Required
router.post("/addmovie", authenticateAdmin, async (req, res) => {
  try {
    const movie = await Movie.create({
      title: req.body.title,
      description: req.body.desc,
      stars: req.body.stars,
      poster_link: req.body.poster_link,
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// ROUTE 2: Add movie show using: POST /api/movies/addshow - Admin Login Required
router.post("/addshow", authenticateAdmin, async (req, res) => {
  try {
    const show = await MovieShow.create({
      date: req.body.date,
      seats: req.body.seats,
      ticket_price: req.body.ticket_price,
      movie: req.body.movie,
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// ROUTE 3: Fetch all movies using: GET /api/movies/getall - No Login Required
router.get("/getall", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// ROUTE 4: Fetch all movie shows using: GET /api/movies/getshows - No Login Required
router.get("/getshows", async (req, res) => {
  try {
    const dateObj = new Date();
    const movieShows = await MovieShow.find({ date: { $gte: dateObj } }).sort({
      date: 1,
    });
    res.status(200).json(movieShows);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// ROUTE 5: Fetch show details using: POST /api/movies/getshowdetails - No Login Required
router.post("/getshowdetails", async (req, res) => {
  try {
    const show = await MovieShow.findById(req.body.showId);
    res.status(200).json(show);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
