const express = require("express");
const router = express.Router();
const fetchUser = require("../middlewares/fetchUser");
const Ticket = require("../models/Ticket");
const MovieShow = require("../models/MovieShow");

router.get("/getall", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const tickets = await Ticket.find({ user_id: userId });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});
