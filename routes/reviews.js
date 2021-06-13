var express = require("express");
var router = express.Router();
var {Review}= require("../models/Review");

router.post("/addReview", async(req,res) => {
    try {
        const {name , email , rating , review, workspace}= req.body;
        const data=new Review({
            name:name,
            email : email,
            rating : rating,
            review : review,
            workspace : workspace,
        });
        var rev = await data.save();
        res.send(rev);
    }catch (e) {
       res.status(404).json(e);
    }
});
router.get("/",async (req,res)=>{
    try {
        const reviews = await Review.find();
        res.send(reviews);
    }catch(e){
        res.status(404).json(e);
    }
});
router.get("/:spaceId",async (req,res)=>{
   try {
       const {spaceId} = req.params;
       const reviews = await Review.find({workspace : {$in : spaceId}});
       res.send(reviews);
   } catch(e){
       res.status(404).json(e);
   }
});
module.exports = router;
