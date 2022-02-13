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

router.get('/', authenticateDriver,function(req, res, next) {
  res.render('driver', {title: 'Driver'});
})

router.get('/register', unauthenticateDriver, function(req, res, next) {
    res.render('driver_register');
});

router.post('/register', async function(req, res) {
	hashedPassword = await bcrypt.hash(req.body.password, 10);
	req.body.password = hashedPassword;
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
            return res.redirect("/driver/login");
		}
	});
});

router.get('/login', unauthenticateDriver, function(req, res, next) {
  res.render('login', {
	  id: "driver"
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
