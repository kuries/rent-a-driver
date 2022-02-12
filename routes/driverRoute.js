var express = require("express");
const driverModel = require("../models/driver");
var router = express.Router();

router.get('/register', function(req, res, next) {
    res.render('driver_register');
});

router.post('/register', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  console.log(email);
  console.log(password);
  res.redirect('/driver/login');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;