const bcrypt = require("bcrypt");
var express = require("express");
var router = express.Router();
var { User } = require("../models/User");
var Space = require("../models/Space");

router.post("/signup", async(req, res) => {
    const emailExist = await User.find({ email: req.body.email });
    const usernameExist = await User.find({ username: req.body.username });

    try {
        if (usernameExist.length !== 0 && emailExist.length !== 0) {
            return res.send({ error: "Username and Email exist already !" });
        }
        if (usernameExist.length !== 0) {
            return res.send({ error: "Username exists already !" });
        }
        if (emailExist.length !== 0) {
            return res.send({ error: "Email exists already !" });
        }
        const hash = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            address: req.body.address || "",
            phoneNumber: req.body.phoneNumber || null,
            password: hash,
        });
        await user.save();
        console.log("done");

        res.send(req.body);
    } catch (e) {
        res.status(404).json({ message: e.message });
    }
});

router.put("/update", async(req, res) => {
    try {
        let valid;
        console.log(req.body._id);
        const user = await User.findOne({ _id: req.body._id });
        console.log(user);
        await bcrypt.compare(req.body.password, user.password).then((v) => {
            valid = v;
        });

        if (!valid) {
            res.send({ error: "Incorrect Password  !" });
            return res.status(401).json({ error: "Incorrect Password  !" });
        }
        const Updated = {
            username: req.body.username,
            email: req.body.email,
            address: req.body.address,
            phoneNumber: req.body.phone,
            password: user.password,
            workspaces: user.workspaces,
        };

        console.log(Updated);
        console.log(req.body._id);
        var update = await User.findByIdAndUpdate({ _id: req.body._id }, Updated);
        const users = {
            username: req.body.username,
            email: req.body.email,
            address: req.body.address,
            phoneNumber: req.body.phone,
            password: user.password,
            workspaces: user.workspaces,
            _id: req.body._id,
        };
        res.send(users);
    } catch (e) {
        res.status(404).json({ message: e });
    }
});

router.get("/userspaces/:_id", async(req, res) => {
    const { _id } = req.params;
    try {
        console.log(_id);
        try {
            const user = await User.findById(_id);

            const spaces = await Space.find({ _id: { $in: user.workspaces } });

            res.send(spaces);
        } catch (e) {
            console.log(e);
        }
    } catch (err) {
        res.status(404).json({ message: err });
    }
});
module.exports = router;