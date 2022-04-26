const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  show_id: {
    type: String,
    required: true,
  },
  show_date: {
    type: Date,
    required: true,
  },
  movie: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  order_id: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("ticket", TicketSchema);
