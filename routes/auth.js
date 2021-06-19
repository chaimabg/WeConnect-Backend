var express = require("express");
var router = express.Router();
var {User} = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async(req, res) => {
    try {
        let user = await User.findOne({ username: req.body.username });
        if (!user) {
            res.send({ error: "User not found !" });
            return null;
        } else {
            if (await bcrypt.compare(req.body.password, user.password)) {
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
            } else {
                res.send({ error: "Incorrect Password  !" });
            }
        }
    } catch (e) {
        console.log(e);
        res.send(e);
    }
});

module.exports = router;
