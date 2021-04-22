const bcrypt = require("bcrypt");
var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.post('/signup',async(req,res)=>{
    const emailExist= await User.find({ email: req.body.email });
    const usernameExist= await User.find({ username: req.body.username });

        try{
            if (usernameExist.length!==0 && emailExist.length!==0) {
                return res.send({ error: 'Username and Email exist already !' });
            }
           if (usernameExist.length!==0) {
                return res.send({ error: 'Username exists already !' });
            }
            if (emailExist.length!==0) {
                return res.send({ error: 'Email exists already !' });
            }
           const hash=await bcrypt.hash(req.body.password, 10);

            const user = new User({
                        username : req.body.username,
                        email: req.body.email ,
                        address: req.body.address || "",
                        phoneNumber :req.body.phoneNumber || null,
                        password: hash
            });
            await user.save();
            console.log("done");

            res.send(req.body);
        }catch (e) {
            res.status(404).json({ message: e.message });
        }


});

router.put('/update/:id',async(req,res)=>{
try {
  await User.findByIdAndUpdate({_id : req.params.id},req.body);
  res.send("updated");
}catch (e) {
  res.status(404).json({ message: e });
}
});
module.exports = router;
