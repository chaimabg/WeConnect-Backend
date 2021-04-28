var mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: String,
    phoneNumber: { type: Number },
    password: {
        type: String,
        required: true,
    },
    workspaces: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Space",
    },
});

module.exports = mongoose.model("User", userSchema);