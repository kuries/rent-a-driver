var express = require("express");
const dealerModel = require("../models/dealer");
var router = express.Router();

router.get('/register', function(req, res, next) {
    res.render('driver_register');
});

router.post('/register', async function(req, res) {
    const dealer = new dealerModel(req.body);
    console.log(req.body);

	try {
		await dealer.save();
		res.redirect();
	} catch (error) {
		response.status(500).send(error);
	}	
    res.redirect('/dealer/login')
});


router.get('/', function(req, res, next) {
  res.render('driver', {title: 'Dealer'});
})

router.get('/register', function(req, res, next) {
    res.render('dealer_register');
});

router.post('/register', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;