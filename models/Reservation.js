var mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  spaceId: {
    type: String,
    ref: "Space",
  },
  NumberOfHours: {
    type: Date,
  },
  AllSpace: {
    type: Boolean,
  },
  identity: {
    type: String,
    default: "",
  },
});
const Reservation = mongoose.model("Reservation", reservationSchema);
exports.Reservation = Reservation;
