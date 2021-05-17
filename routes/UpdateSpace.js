var express = require("express");
var router = express.Router();
const { Space } = require("../models/Space");

router.put("/", async (req, res) => {
  try {
    const {
      spaceId,
      name,
      location,
      description,
      hourOpen,
      hourClose,
    } = req.body;
    const space = await Space.findById(spaceId);
    try {
      const updatedSpace = await Space.update(
        { _id: spaceId },

        {
          name: name,
          location: location,
          description: description,
          hourOpen: hourOpen,
          hourClose: hourClose,
        }
      );
      res.status(200).json(updatedSpace);
    } catch (e) {
      res.send(e);
      console.log(e);
    }
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
