var express = require("express");
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

//render when dealer is authenticated
router.get("/", authenticateDealer, async function (req, res) {
    const val = await dealerModel.findOne({ email: "asdf@gmail.com" }).exec();
    const data = await driverModel.find({}).exec();
    // console.log(data);

    res.render("dealer", {
        title: "Dealer",
        name: val.name,
        result: data,
    });
});

router.get("/register", function (req, res, next) {
    res.render("dealer_register");
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
            return res.redirect("/dealer");
        }
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

module.exports = router;
