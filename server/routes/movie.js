const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
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

// ROUTE 2: Fetch all movies using: GET /api/movies/getall - No Login Required
router.get("/getall", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
