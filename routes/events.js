var express = require("express");
var router = express.Router();
const { Space } = require("../models/Space");
const { Event } = require("../models/Event");

router.get("/", async (req, res) => {
    try {
        const events = await Event.find();
        res.send(events);
    } catch (err) {
        res.status(404).json({ message: err });
    }

});
router.get("/:spaceId", async (req, res) => {
    try {const {spaceId} = req.params;
        const events = await Event.find({workspace: {$in : spaceId}});

        res.send(events);
    } catch (err) {
        res.status(404).json({ message: err.toString() });
    }
});
router.post("/", async (req, res) => {
    try {
        const { name, date, description, time , workspace } = req.body;

        const event = new Event({
            name: name,
            description: description,
            time: time,
            date: date,
            workspace:workspace,

        });
        const savedEvent = await event.save();

        res.send(savedEvent);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});
module.exports = router;
