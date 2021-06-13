var mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    time: {
        type: Date,
    },
    date: {
        type: Date,
    },
    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Space",
    }
});
const Event = mongoose.model("Event", eventSchema);
exports.Event = Event;
