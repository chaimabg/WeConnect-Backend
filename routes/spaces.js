var express = require("express");
var router = express.Router();
var multer = require("multer");
const { Space } = require("../models/Space");
const { User } = require("../models/User");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});
router.get("/", async (req, res) => {
  try {
    const spaces = await Space.find();
    res.status(200).json(spaces);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.get("/search/:q", async (req, res) => {
  var q = req.params.q;
  var regex = new RegExp(q, "i");
  try {
    const spaces = await Space.find({ name: regex });
    const spacesLoc = await Space.find({ location: regex });
    res.status(200).json(spaces.concat(spacesLoc));
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.get("/:spaceId", async (req, res) => {
  try {
    const space = await Space.findById(req.params.spaceId);
    res.status(200).json(space);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.post("/" /*, upload.single("pictures"),*/, async (req, res) => {
  const space = new Space({
    name: req.body.name,
    location: req.body.location,
    description: req.body.description,
    hourOpen: req.body.hourOpen,
    hourClose: req.body.hourClose,
    pictures: "http://localhost:5000/",
  });
  try {
    console.log("1");
    const savedSpace = await space.save();
    console.log("2");
    const up = await User.findByIdAndUpdate(
      { _id: req.body.userId },
      {
        $push: {
          workspaces: savedSpace,
        },
      }
    );
    res.status(200).json(savedSpace);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.put("/", upload.single("pictures"), async (req, res) => {
  try {
    const updatedSpace = await Space.findByIdAndUpdate(
      { _id: req.body.spaceId },

      {
        name: req.body.name,
        location: req.body.location,
        description: req.body.description,
        hourOpen: req.body.hourOpen,
        hourClose: req.body.hourClose,
        pictures: "http://localhost:5000/" + req.file.path,
      }
    );
    res.status(200).json(updatedSpace);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.delete("/:spaceId", async (req, res) => {
  try {
    const removedSpace = await Space.remove({ _id: req.params.spaceId });
    res.status(200).json(removedSpace);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});
module.exports = router;
