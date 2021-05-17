const bcrypt = require("bcrypt");
const crypto = require('crypto');
var express = require("express");
var router = express.Router();
var { User } = require("../models/User");
var { Space } = require("../models/Space");
var { ResetPassToken } = require("../models/ResetPassToken");
const nodeMailer = require("nodemailer");

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

router.post("/validateToken",async (req,res)=>{
try {
    const token = req.body.resetToken;
    const passToken= await ResetPassToken.findOne({resetToken : token});
    console.log(passToken);
    if(passToken == null){
        res.send({error: "Token has expired ! Try again "});
    }
    const user = await User.findOne({_id:passToken.userId});
    if (! user){
        res.send({error: "User not found !"});
    }
    res.send(user._id);
}catch (e) {
    res.status(404).json({error: e})
}
});
//Reset user Password

router.put("/resetPassword",async (req,res)=>{
 try{
   const userId= req.body._id;
   const pass = await bcrypt.hash(req.body.password, 10);
   const update = await User.findByIdAndUpdate({ _id: userId }, {password : pass});
   res.send("Your password has been successfully reset ");
 }catch(e){
   res.status(404).json({error : e});
 }
});

// send email to user to reset password

router.post("/sendEmail",async(req,res)=>{
try{
  const email= req.body.email;
  const user= await User.findOne({email : email});
  if(user == null ){
    res.send({error : "User not found please try again"});
  }
  var token = new ResetPassToken({
              userId : user._id,
              resetToken: crypto.randomBytes(5).toString('hex')
              });
  var passTok= await token.save();
  var remove = await  ResetPassToken.find({ _userId: user._id, resetToken: { $ne: passTok.resetToken } }).remove().exec();
  var transporter = nodeMailer.createTransport({
    service: 'Gmail',
    port: 465,
    auth: {
      user: 'contactWeConnectApp@gmail.com',
      pass: 'weconnect123'
    }
  });
  var mailOptions = {
    to: user.email,
    from: 'contactWeConnectApp@gmail.com',
    subject: 'WeConnect Password Reset',
    html : '<h2 style="color: black" >Hi '+user.username+', </h2>'+
           '<hr size="0.2px" ">' +
        '<p style="color: black">You are receiving this because you  have requested the reset of the password for your WeConnect account.<br></p>' +
        '<p style="color: black" >Please click on the following link, or paste this into your browser to complete the process:<br></p>' +
        'http://localhost:4200/resetPassword/' + passTok.resetToken+
        '<p style="color: black" >If you did not request this, please ignore this email and your password will remain unchanged.<br></p>'+
        '<cite style="color: black">-WeConnect team</cite>',

  };
  var mail= await transporter.sendMail(mailOptions, (err, info) => {
    if (err){ res.send(err);}
    else {res.send({sucess :"Message sent successfully: " + info.response});}
  })

}catch(e){
  res.status(404).json({ message: e });
}
});
module.exports = router;

