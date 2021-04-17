var mongoose = require("mongoose");

const spaceSchema = mongoose.Schema({
    name: String,
    location: String,
    description: String,
    picture: String,
    joined: {
        type: Date,
        default: new Date(),
    },
});

const space = mongoose.model("space", spaceSchema);
export default space;