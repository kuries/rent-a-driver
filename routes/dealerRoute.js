var express = require("express");
const dealerModel = require("../models/dealer");
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('driver', {title: 'Dealer'});
})

router.get('/register', function(req, res, next) {
  res.render('dealer_register');
});

router.post('/register', function(req, res) {
  
  const new_dealer = new dealerModel(req.body);
	new_dealer.save(function(err, result) {
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
      return res.redirect('/dealer');
    }
  });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;