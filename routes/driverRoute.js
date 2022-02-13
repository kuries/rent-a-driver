var express = require("express");
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

router.get('/', authenticateDriver,function(req, res, next) {
  res.render('driver', {title: 'Driver'});
})

router.get('/register', unauthenticateDriver, function(req, res, next) {
    res.render('driver_register');
});

router.post('/register', function(req, res) {
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
		}
	});
	return res.redirect("/driver/login");
});

router.get('/login', unauthenticateDriver, function(req, res, next) {
  res.render('login');
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
