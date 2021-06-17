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
    latitudeMap: Number,
    longitudeMap: Number,
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

    capacity: {
        type: Number,
    },
    rating: {
        type: Number,
        default: 0,
    },
    sumRating: {
        type: Number,
        default: 0,
    },
    sumClient: {
        type: Number,
        default: 0,
    }

});
const Space = mongoose.model("Space", spaceSchema);
exports.Space = Space;
