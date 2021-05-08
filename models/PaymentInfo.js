var mongoose = require("mongoose");

const paymentInfoSchema = mongoose.Schema({
    nameOnCard: {
        type: String,
        required: true,
    },
    cardNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    cvc: {
        type: Number,
        required: true,
    },
    mm: {
        type: Number,
        required: true,
    },
    yyyy: {
        type: Number,
        required: true,
    },
    sold: {
        type: Number,
        required: true,
    },
});
const PaymentInfo = mongoose.model("PaymentInfo", paymentInfoSchema);
exports.PaymentInfo = PaymentInfo;