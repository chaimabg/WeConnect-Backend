var express = require("express");
var router = express.Router();
const { PaymentInfo } = require("../models/PaymentInfo");

router.post("/", async(req, res) => {
    try {
        const { nameOnCard, cardNumber, cvc, mm, yyyy, sold } = req.body;
        const paymentInfo = new PaymentInfo({
            nameOnCard: nameOnCard,
            cardNumber: cardNumber,
            cvc: cvc,
            mm: mm,
            yyyy: yyyy,
            sold: sold,
        });
        const paymentInfoSaved = await paymentInfo.save();
        res.status(200).json(paymentInfoSaved);
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: err });
    }
});
router.get("/", async(req, res) => {
    try {
        const paymentInfoAll = await PaymentInfo.find();
        res.status(200).json(paymentInfoAll);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});
router.get("/:cardNumber", async(req, res) => {
    try {
        const paymentInfo = await PaymentInfo.findOne({
            cardNumber: req.params.cardNumber,
        });
        res.status(200).json(paymentInfo);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

router.put("/:sold", async(req, res) => {
    try {
        const paymentInfo = await PaymentInfo.findOne({
            cardNumber: req.body.cardNumber,
        });
        console.log(paymentInfo);
        if (paymentInfo.nameOnCard != req.body.nameOnCard) {
            return res.status(400).json({ error: "Incorrect Name On Card" });
        }
        if (paymentInfo.cvc != req.body.cvc) {
            return res.status(400).json({ error: "Incorrect cvc" });
        }
        if (paymentInfo.mm != req.body.mm) {
            return res.status(400).json({ error: "Incorrect mm" });
        }
        if (paymentInfo.yyyy != req.body.yyyy) {
            return res.status(400).json({ error: "Incorrect yyyy" });
        }
        if (paymentInfo.sold < req.params.sold) {
            return res.status(400).json({ error: "Insufficient Sold in your card" });
        }
        const paymentInfoUpdated = await PaymentInfo.findOneAndUpdate({
            cardNumber: req.body.cardNumber,
        }, {
            cardNumber: req.body.cardNumber,
            nameOnCard: req.body.nameOnCard,
            cvc: req.body.cvc,
            mm: req.body.mm,
            yyyy: req.body.yyyy,
            sold: paymentInfo.sold - req.params.sold,
        });
        res.status(200).json(paymentInfo);
    } catch (error) {
        res.status(404).json({ message: error });
    }
});
module.exports = router;