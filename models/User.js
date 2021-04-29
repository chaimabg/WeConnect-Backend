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
});

module.exports = mongoose.model("User", userSchema);