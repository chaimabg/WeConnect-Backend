var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
    res.send("We are on spaces");
});
module.exports = router;