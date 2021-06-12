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
  capacity :{
     type : Number
  },
  joined: {
    type: Date,
    default: Date.now,
  },
  rating:{
    type : Number,
    default: 0,
  },
  sumRating:{
    type : Number,
    default: 0 ,
  },
  sumClient: {
    type : Number ,
    default: 0,
  }
});
const Space = mongoose.model("Space", spaceSchema);
exports.Space = Space;
