var mongoose = require("mongoose");

const spaceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: String,
    hourOpen: { type: Date },
    hourClose: Date,
    pictures: [String],
    joined: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("Space", spaceSchema);
//const Space = mongoose.model("Space", spaceSchema);
//exports.Space = Space;