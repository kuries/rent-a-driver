var express = require("express");
const bcrypt = require("bcrypt");
const driverModel = require("../models/driver");
const dealerModel = require("../models/dealer");
var router = express.Router();

function authenticateDriver(req, res, next) {
    if (req.session.email && req.session.designation == "driver") {
        next();
    } else {
        return res.redirect("/");
    }
}

function unauthenticateDriver(req, res, next) {
    if (req.session.email && req.session.designation == "driver") {
        return res.redirect("/");
    } else {
        next();
    }
}

router.get("/", authenticateDriver, async function (req, res, next) {
    const driverEntry = await driverModel
        .findOne({ email: req.session.email })
        .exec();
    const dealerEntry = await dealerModel
        .find({
            $or: [{ from: driverEntry.city }, { to: driverEntry.city }],
        })
        .exec();
    res.render("driver", {
        title: "Driver",
        name: driverEntry.name,
        result: dealerEntry,
        number: dealerEntry.length,
        check: true,
    });
});

router.get("/register", unauthenticateDriver, function (req, res, next) {
    res.render("driver_register", { check: false });
});

router.post('/register', async function(req, res) {
	hashedPassword = await bcrypt.hash(req.body.password, 10);
	req.body.password = hashedPassword;

	req.body.from = [];
	req.body.from.push(req.body.route1_city);
	req.body.from.push(req.body.route3_city);
	req.body.from.push(req.body.route5_city);

	req.body.to = []
	req.body.to.push(req.body.route2_city);
	req.body.to.push(req.body.route4_city);
	req.body.to.push(req.body.route6_city);

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

router.get("/login", unauthenticateDriver, function (req, res, next) {
    res.render("login", {
        id: "driver",
        check: false,
    });
});

router.post("/login", async function (req, res) {
    const user = driverModel.findOne({ email: req.body.email }).exec();
    var isValid = await user.then((docs) => {
        return bcrypt
            .compare(req.body.password, docs.password)
            .then((result) => {
                return result;
            })
            .catch((err) => console.log(err));
    });
    if (isValid) {
        req.session.email = req.body.email;
        req.session.designation = "driver";
        req.session.save();
        res.redirect("/driver");
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
