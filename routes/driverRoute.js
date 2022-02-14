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

router.post("/register", async function (req, res) {
    hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const new_driver = new driverModel(req.body);

    new_driver.save(function (err, result) {
        if (err) {
            if (err.name == "ValidationError") {
                for (field in err.errors) {
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
    const user = await driverModel.findOne({ email: req.body.email }).exec();
	if(!user)	//email check
		res.redirect('/driver/login');

    var isValid = await bcrypt
            .compare(req.body.password, user.password)
            .then((result) => {
                return result;
            })
            .catch((err) => console.log(err));

    if (isValid) {	//password check
        req.session.email = req.body.email;
        req.session.designation = "driver";
        req.session.save();
        res.redirect("/driver");
    }
	else
		res.redirect('/driver/login');
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
