var express = require("express");
const bcrypt = require("bcrypt");
// const flash = require("express-flash");
const app = require("../app");
const dealerModel = require("../models/dealer");
const driverModel = require("../models/driver");
var router = express.Router();

function authenticateDealer(req, res, next) {
    if (req.session.email && req.session.designation == "dealer") {
        next();
    } else {
		// req.flash('error', 'Dealer unauthenticated');
        return res.redirect("/");
    }
}

function unauthenticateDealer(req, res, next) {
    if (req.session.email && req.session.designation == "dealer") {
		req.flash('error', 'Dealer already authenticated');
        return res.redirect("/");
    } else {
        next();
    }
}

router.get("/register", unauthenticateDealer, function (req, res, next) {
    res.render("dealer_register", { check: false });
});

router.post("/register", async function (req, res) {
    hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    const new_dealer = new dealerModel(req.body);

    new_dealer.save(function (err, result) {
        if (err) {
            if (err.name == "ValidationError") {
                for (field in err.errors) {
                    console.log(err.errors[field].message);
                }
            }
        } else {
            console.log("Success");
            return res.redirect("/dealer/login");
        }
    });
});

//functions for handling the loading of website

//render when dealer is authenticated
router.get("/", authenticateDealer, async function (req, res) {
    const dealerEntry = await dealerModel
        .findOne({ email: req.session.email })
        .exec();
    const driverEntry = await driverModel
        .find({
            $or: [{ from: dealerEntry.city }, { to: dealerEntry.city }],
        })
        .exec();

    //truncate data to relavant values
    res.render("dealer", {
        title: "Dealer",
        name: dealerEntry.name,
        email: dealerEntry.email,
        result: driverEntry,
        number: driverEntry.length,
        check: true,
    });
});

router.post("/", async (req, res) => {
    const dealerEntry = await dealerModel
        .findOne({ email: req.session.email })
        .exec();
    const driverEntry = await driverModel
        .find({
            $or: [{ from: req.body.city }, { to: req.body.city }],
        })
        .exec();

    res.render("dealer", {
        title: "Dealer",
        name: dealerEntry.name,
        email: dealerEntry.email,
        result: driverEntry,
        number: driverEntry.length,
        check: true,
    });
});

router.get("/booked", authenticateDealer, async function (req, res) {
    const dealerEntry = await dealerModel
        .findOne({ email: req.session.email })
        .exec();
    // console.log(data);
<<<<<<< HEAD
	var emailAddresses = dealerEntry.relation;
	var data= new Array();
	for (var i of emailAddresses)
	{
		if(i=="")
		continue;
		else{
			var value = await driverModel.findOne({email: i}).exec();
			data.push(value);
		}
	}
=======
    var emailAddresses = dealerEntry.relation;
    var data = new Array();
    for (var i of emailAddresses) {
        if (i == "") continue;
        else {
            var value = await driverModel.findOne({ email: i }).exec();
            data.push(value);
        }
    }
>>>>>>> 901fd95991a943cb32884b6c1f70c8151bd76254

    res.render("booked", {
        title: "Dealer",
        name: dealerEntry.name,
        result: data,
        number: data.length,
        check: true,
    });
});

//functions for handling login for dealers
router.get("/login", unauthenticateDealer, function (req, res, next) {
    res.render("login", {
        id: "dealer",
        check: false,
    });
});

router.post("/login", async function (req, res) {
    console.log(req.body.email);
    const user = dealerModel.findOne({ email: req.body.email }).exec();

	var isValid = await user.then((docs) => {
		if(!docs)
		{
			return bcrypt
			.compare(req.body.password, user.password)
			.then((result) => {
				return result;
			})
			.catch((err) => console.log(err));
		}
	});
	if (isValid) {
		req.session.email = req.body.email;
		req.session.designation = "dealer";
		req.session.save();
		res.redirect("/dealer/login");
	}
	else{

		res.redirect('/dealer/login');
	}

});

//display booked drivers
router.post("/bookDriver", authenticateDealer, async function (req, res, next) {
    var driver_email = req.body.email;
    var dealer_email = req.session.email;
    console.log(driver_email);
    // var query = {email: dealer_email};
    // console.log(email)
    const doc = await dealerModel.findOne({ email: dealer_email }).exec();
    var val = doc.relation;

    var arr = [...val, driver_email];
    console.log(arr);

    dealerModel.findOneAndUpdate(
        { email: dealer_email },
        { relation: arr },
        { upsert: false },
        function (err, doc) {
            if (err) return res.send(500, { error: err });
            return res.redirect("/");
        }
    );
});

//deletes booked driver
router.post('/deleteBookedDriver', authenticateDealer, async function(req, res, next)
{
	var driver_email = req.body.email;
	var dealer_email = req.session.email;
	const doc = await dealerModel.findOne({email: dealer_email}).exec();
	var val = doc.relation;

	const index = val.indexOf(driver_email);
	if(index > -1)
	{
		val.splice(index, 1);
		console.log(val);
	}

	dealerModel.updateOne({email:dealer_email},{relation : val},{upsert: false},
	function(err, doc) {
		if (err) return res.send(500, {error: err});
		return res.redirect('/dealer/booked');
	});

});

module.exports = router;
