const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URI, () => {
  console.log("Connected to Mongo successfully.");
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.use("/api/auth", require("./api/auth"));
app.use("/api/movies", require("./api/movie"));
app.use("/api/payment", require("./api/payment"));
app.use("/api/ticket", require("./api/ticket"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
