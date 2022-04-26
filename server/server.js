const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = 5000;

mongoose.connect(process.env.MONGO_URI, () => {
  console.log("Connected to Mongo successfully.");
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/movies", require("./routes/movie"));
app.use("/api/payment", require("./routes/payment"));
app.use("/api/ticket", require("./routes/ticket"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
