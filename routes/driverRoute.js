var express = require("express");
const bcrypt = require("bcrypt");
const driverModel = require("../models/driver");
var router = express.Router();

function authenticateDriver(req, res, next)
{
	if(req.session.email && req.session.designation == "driver")
	{
		next();
	}
	else
	{
		return res.redirect('/');
	}
}

function unauthenticateDriver(req, res, next)
{
	if(req.session.email && req.session.designation == "driver")
	{
		return res.redirect('/');
	}
	else
	{
		next();
	}
}

router.get('/', authenticateDriver, function(req, res, next) {
  res.render('driver', {title: 'Driver', check: true});
})

router.get('/register', unauthenticateDriver, function(req, res, next) {
    res.render('driver_register', {check: false});
});

router.post('/register', async function(req, res) {
	hashedPassword = await bcrypt.hash(req.body.password, 10);
	req.body.password = hashedPassword;

	var route1 = [req.body.route1_state, route1_city];
	var route2 = [req.body.route2_state, route2_city];
	var route3 = [req.body.route3_state, route3_city];
	req.body.routes.push([route1, route2, route3]);

  	const new_driver = new driverModel(req.body);
	
	new_driver.save(function(err, result) {
		if (err)
		{
			if(err.name == 'ValidationError') 
			{
				for (field in err.errors)
				{
				console.log(err.errors[field].message);
				}
			}
		} else {
            console.log("Success");
            res.redirect("/driver/login");
		}
	});
});

router.get('/login', unauthenticateDriver, function(req, res, next) {
  res.render('login', {
	  id: "driver",
	  check: false
  });
});

router.post('/login', async function(req, res) {
	const user = driverModel.findOne({ email: req.body.email }).exec();
	var isValid = await user.then(docs => {
        return bcrypt
            .compare(req.body.password, docs.password)
            .then(result => {
                return result;
            })
            .catch (err => console.log(err) )
    });
	if (isValid)
	{
		req.session.email = req.body.email;
		req.session.designation = 'driver';
		req.session.save();
		res.redirect('/driver');
	}
});

router.get("/data", async (request, response) => {
    const data = await driverModel.find({});

    try {
        response.send(data);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = router;
