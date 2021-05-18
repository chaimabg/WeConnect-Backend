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
    var reserv = await Reservation.find({ spaceId: req.params.id });
    console.log(reserv);
    var somme = 0 ;
    reserv.forEach(item =>{ somme = somme + item.guests});
    const spaces = await Space.findOne({_id :req.params.id});
    console.log(spaces);
    var tab = [
      {
        capacity: spaces.capacity,
        exists: somme,
      },
    ];
    console.log(tab);
    res.send(tab);

  } catch (e) {
    console.log("eee", e);
  }

});
module.exports = router;
