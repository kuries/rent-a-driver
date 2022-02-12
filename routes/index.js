var express = require("express");
const dealerModel = require("../models/dealer");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

router.get("/home", function (req, res, next) {
    res.render("driver", { title: "Driver" });
});

module.exports = router;
