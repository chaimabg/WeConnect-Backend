var mongoose = require("mongoose");

const spaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  hourOpen: {
    type: Date,
  },
  hourClose: {
    type: Date,
  },
  pictures: [String],
  joined: {
    type: Date,
    default: Date.now,
  },
});
const Space = mongoose.model("Space", spaceSchema);
exports.Space = Space;
