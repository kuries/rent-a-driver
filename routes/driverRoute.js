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
  /*
  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;
  var age = req.body.age;
  var truckNo = req.body.truckNo;
  var mobileNo = req.body.mobileNo;
  var truckCapacity = req.body.truckCapacity;
  var transpoterName = req.body.transpoterName;
  var drivingExp = req.body.drivingExp;
  var route1 = req.body.route1;*/
/*
  var driver_record = {
    'email': email,
    'hashedPassword': password,
    'name': name,
    'age': age,
    'truckNo': truckNo,
    'mobileNo': mobileNo,
    'truckCapacity': truckCapacity,
    'transpoterName': transpoterName,
    'drivingExp': drivingExp,
    'routes': [[route1]],
    'relation': [['']]
  };*/

  //console.log(driver_record);
  const new_driver = new driverModel(req.body);
	new_driver.save(function(err, result) {
    if (err)
    {
      if(err.name == 'ValidationError') {
        for (field in err.errors)
        {
          console.log(err.errors[field].message);
        }
      }
    }
    else
    {
      console.log('Success');
      return res.redirect('/driver');
    }
  });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;