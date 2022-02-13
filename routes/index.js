var express = require("express");
const dealerModel = require("../models/dealer");
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

router.get("/home", function (req, res, next) {
    res.render("driver", { title: "Driver" });
});

router.get("/home_dealer", function (req, res, next) {
    var citiesByState
    fs.readFile("./test2.json", (err, data) => {
        if(err)
            throw err;
        citiesByState = JSON.parse(data);
    })

    res.render("dealer", { title: "Dealer" , data: citiesByState});
});

module.exports = router;
