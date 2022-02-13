var express = require("express");
const dealerModel = require("../models/dealer");
var router = express.Router();
var fs = require("fs");
const session = require("express-session");

/* GET home page. */
router.get("/", function (req, res, next) {
	// console.log(req.session)
    // res.render("index", { title: "Express" });
	if(req.session.email)
	{
		if(req.session.designation == "driver")
		{
			res.redirect('/driver');
		}
		else if(req.session.designation == "dealer")
		{
			res.redirect('/dealer');
		}
	}
	else
	{
		res.render("index", { title: "Express" });
	}
});

router.get("/home", function (req, res, next) {
    res.render("driver", { title: "Driver" });
});

router.get("/home_dealer", function (req, res, next) {
    var citiesByState
    fs.readFile("./test2.json", (err, data) => {
        if(err)
            throw err;
        citiesByState = JSON.parse(data);
    })

    res.render("dealer", { title: "Dealer" , data: citiesByState});
});




//logout globally
router.get('/logout', (req,res)=>
{
	if(req.session.email)
	{
		if(req.session.designation == "dealer" || req.session.designation == "driver")
		{
			req.session.destroy();
		}
	}
	res.redirect('/');
});


module.exports = router;
