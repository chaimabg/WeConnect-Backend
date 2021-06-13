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
});
const Space = mongoose.model("Space", spaceSchema);
exports.Space = Space;