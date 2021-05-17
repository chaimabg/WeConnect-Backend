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

router.get("/:id", async (req, res) => {
  try {
    reserv = await Reservation.find({ spaceId: req.params.id });
    console.log(reserv);
  } catch (e) {
    console.log("eee", e);
  }
  const spaces = await Space.findById(req.params.id);
  console.log(spaces);
  var tab = [
    {
      capacity: spaces.capacity,
      exists: reserv.length,
    },
  ];
  console.log(tab);
  res.send(tab);
});
module.exports = router;
