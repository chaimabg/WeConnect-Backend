var express = require("express");
var router = express.Router();
var User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        res.send({ error: "User not found !" });
        return res.status(401).json({ error: "User not found !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            res.send({ error: "Incorrect Password  !" });
            return res.status(401).json({ error: "Incorrect Password  !" });
          }
          res.send({
            _id: user._id,
            username: user.username,
            email: user.email,
            address: user.address,
            phoneNumber: user.phoneNumber,
            token: jwt.sign({ userId: user._id }, "TOKEN_KEY", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
});

module.exports = router;
