const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stars: {
    type: String,
    required: true,
  },
  poster_link: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("movie", MovieSchema);
