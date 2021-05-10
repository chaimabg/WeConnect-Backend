const bcrypt = require("bcrypt");
var express = require("express");
var router = express.Router();
var { User } = require("../models/User");
var { Space } = require("../models/Space");

router.post("/signup", async (req, res) => {
  
  
  const emailExist = await User.find({ email: req.body.email });
  console.log(emailExist);
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
    } else {
      
      const hash = await bcrypt.hash(req.body.password, 10);
     
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        password: hash,
      });
      console.log(user);
      const result = await user.save();
      console.log(result);
      console.log("done");

      res.send(req.body);
    }
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

router.put("/update", async (req, res) => {
  try {
    let valid;
    const user = await User.findOne({ _id: req.body._id });
    const updated = {
      username: req.body.username,
      email: req.body.email,
      address: req.body.address,
      phoneNumber: req.body.phone,
      password: user.password,
      workspaces: user.workspaces,
      _id: req.body._id,
    };

    const username = await User.findOne({ username: updated.username });
    const email = await User.findOne({ email: updated.email });
    if (username && user.username !== updated.username) {
      res.send("Username already exits");
    }
    if (email && user.email !== updated.email) {
      res.send("Email already exits");
    }

    await bcrypt.compare(req.body.password, user.password).then((v) => {
      valid = v;
    });
    if (!valid) {
      res.send({ error: "Incorrect Password  !" });
    }

    var update = await User.findByIdAndUpdate({ _id: req.body._id }, updated);

    res.send(updated);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

router.get("/userspaces/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const user = await User.findById(_id);
    const spaces = await Space.find({ _id: { $in: user.workspaces } });
    res.send(spaces);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});
module.exports = router;
