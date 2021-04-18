var express = require("express");
var router = express.Router();
const Space = require("../models/Space");
router.get("/", async(req, res) => {
    try {
        const spaces = await Space.find();
        res.status(200).json(spaces);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

router.get("/:spaceId", async(req, res) => {
    try {
        const space = await Space.findById(req.params.spaceId);
        res.status(200).json(space);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

router.post("/", async(req, res) => {
    const space = new Space({
        name: req.body.name,
        location: req.body.location,
        description: req.body.description,
        pictures: req.body.pictures,
    });
    try {
        const savedSpace = await space.save();
        res.status(200).json(savedSpace);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

router.put("/", async(req, res) => {
    try {
        const updatedSpace = await Space.findByIdAndUpdate({ _id: req.body.spaceId },

            req.body, { new: true }
        );
        res.status(200).json(updatedSpace);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

router.delete("/:spaceId", async(req, res) => {
    try {
        const removedSpace = await Space.remove({ _id: req.params.spaceId });
        res.status(200).json(removedSpace);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});
module.exports = router;