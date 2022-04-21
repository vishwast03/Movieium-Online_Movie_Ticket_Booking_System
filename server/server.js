const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = 5000;

mongoose.connect(process.env.MONGO_URI, () => {
  console.log("Connected to Mongo successfully.");
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.use("/api/auth", require("./routes/auth"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
