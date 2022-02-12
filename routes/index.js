var express = require("express");
const dealerModel = require("../models/dealer");
const driverModel = require("../models/driver");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

router.get("/home", function (req, res, next) {
    res.render("driver", { title: "Driver" });
});

router.get('/driver/register', function(req, res, next) {
  res.render('driver_register');
});

router.get('/driver/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;
