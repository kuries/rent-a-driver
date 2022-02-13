var express = require("express");
// const { routes } = require("../app");
const dealerModel = require("../models/dealer");
const driverModel = require("../models/driver");
var router = express.Router();


function authenticateDealer(req, res, next)
{
	if(req.session.email && req.session.designation == "dealer")
	{
		next();
	}
	else
	{
		return res.redirect('/');
	}
}

function unauthenticateDealer(req, res, next)
{
	if(req.session.email && req.session.designation == "dealer")
	{
		return res.redirect('/');
	}
	else
	{
		next();
	}
}

router.get('/register', unauthenticateDealer, function(req, res, next) {
    res.render('dealer_register');
});

router.post("/register", function (req, res) {
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
            return res.redirect("/driver/login");
        }
    });
});


//render when dealer is authenticated
router.get("/", authenticateDealer, async function (req, res) {
    const val = await dealerModel.findOne({ email: req.session.email }).exec();
    const data = await driverModel.find({}).exec();
    // console.log(data);

    res.render("dealer", {
        title: "Dealer",
        name: val.name,
		email: val.email,
        result: data,
    });
});

router.get('/login', unauthenticateDealer, function(req, res, next) {
  res.render('login');
});

router.get("/data", async (request, response) => {
    const data = await dealerModel.find({});

    try {
        response.send(data);
    } catch (error) {
        response.status(500).send(error);
    }
});

//display booked drivers
router.post('/bookDriver', authenticateDealer, async function(req, res, next){
	var driver_email = req.body.email;
	var dealer_email = req.session.email;
	console.log(driver_email);
	// var query = {email: dealer_email};
	// console.log(email)
	const doc = await dealerModel.findOne({email: dealer_email}).exec();
	var val = doc.relation;
	
	var arr = [...val, driver_email];
	console.log(arr)

	dealerModel.findOneAndUpdate({email: dealer_email}, {relation : arr}, {upsert: false}, function(err, doc) {
		if (err) return res.send(500, {error: err});
		return res.redirect('/');
	});

})

module.exports = router;
