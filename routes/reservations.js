var express = require("express");
var router = express.Router();
const { Reservation } = require("../models/Reservation");
const { Space } = require("../models/Space");
const Crypto = require("crypto");
router.post("/", async (req, res) => {
  const { date, time, guests, NumberOfHours, AllSpace, spaceId } = req.body;
  console.log("boduyyyyyyyyyyy!!!!!!", req.body);
  try {
    var identity = Crypto.randomBytes(9).toString("hex");
    const reservation = new Reservation({
      date,
      time,
      guests,
      NumberOfHours,
      AllSpace,
      spaceId,
      identity,
    });

    const result = await reservation.save();
    console.log(result);
    res.send(result);
  } catch (e) {
    console.log(e);
    res.send("error:");
  }
});

router.post("/reserv", async (req, res) => {
  const { id, date } = req.body;
  console.log(req.body);
  try {
    var somme = 0;
    var reserv = await Reservation.find({ spaceId: id, date: date });

    reserv.forEach((item) => {
      somme = somme + item.guests;
    });
    var boo = false;
    if (reserv.length != 0) {
      boo = reserv[0].AllSpace;
    }
    console.log(id);
    const spaces = await Space.findOne({ _id: id });
    console.log(spaces);
    var tab = [
      {
        capacity: spaces.capacity,
        exists: somme,
        reserved: boo,
      },
    ];
    console.log(tab);
    res.send(tab);
  } catch (e) {
    console.log("eee", e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const reservations = await Reservation.find({ spaceId: req.params.id });
    console.log("ok");
    res.send(reservations);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const removedReservation = await Reservation.remove({ _id: req.params.id });
    console.log("iikkk");
    res.status(200).json(removedReservation);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

module.exports = router;
