var mongoose = require("mongoose");

const resetPassTokenSchema =  mongoose.Schema({
    userId : {
        type : mongoose.Schema.ObjectId,
        ref: "User",
        required : true
    },
    resetToken:{
        type : String,
        required : true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 300
    },
});
const ResetPassToken = mongoose.model("ResetToken" ,resetPassTokenSchema );
exports.ResetPassToken= ResetPassToken;
