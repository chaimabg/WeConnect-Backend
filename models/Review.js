var mongoose =require("mongoose");

const reviewSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    rating : Number,
    review : {
        type : String ,
        required : true
    },
    date:{
        type: Date,
        default: Date.now
    },
    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Space",
    }
});
const Review= mongoose.model("Review",reviewSchema);
exports.Review=Review;
