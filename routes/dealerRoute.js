var express = require("express");
const bcrypt = require("bcrypt");
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
    res.render('dealer_register', {check: false});
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

//render when dealer is authenticated
router.get("/", authenticateDealer, async function (req, res) {
    const val = await dealerModel.findOne({ email: "asdf@gmail.com" }).exec();
    const data = await driverModel.find({}).exec();
    // console.log(data);

    res.render("dealer", {
        title: "Dealer",
        name: val.name,
        result: data,
        check: true
    });
});

router.get('/login', unauthenticateDealer, function(req, res, next) {
  res.render('login', {
      id: "dealer",
      check: false
  });
});

router.post('/login', async function(req, res) {
    console.log(req.body.email);
	const user = dealerModel.findOne({ email: req.body.email }).exec();
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
		req.session.designation = 'dealer';
		req.session.save();
		res.redirect('/dealer');
	}
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
