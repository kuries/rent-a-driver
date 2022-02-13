var express = require("express");
const driverModel = require("../models/driver");
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('driver', {title: 'Driver'});
})

router.get('/register', function(req, res, next) {
    res.render('driver_register');
});

router.post('/register', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;