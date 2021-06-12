var express = require("express");
var router = express.Router();
const { Reservation } = require("../models/Reservation");
const { Space } = require("../models/Space");

router.post("/", async (req, res) => {
  const { date, time, guests, NumberOfHours, AllSpace, spaceId } = req.body;
  console.log("boduyyyyyyyyyyy!!!!!!", req.body);
  try {
    const reservation = new Reservation({
      date,
      time,
      guests,
      NumberOfHours,
      AllSpace,
      spaceId,
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
module.exports = router;
