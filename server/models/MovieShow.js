const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieShowSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  ticket_price: {
    type: Number,
    required: true,
  },
  movie: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("movieShow", MovieShowSchema);
