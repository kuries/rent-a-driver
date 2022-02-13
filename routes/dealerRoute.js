var express = require("express");
const dealerModel = require("../models/dealer");
const driverModel = require("../models/driver");
var router = express.Router();

router.get("/", function (req, res, next) {
    const data = driverModel.find({}, (err, data) => {
        if (err) {
            console.log(err);
        } else res.render("dealer", { title: "Dealer", result: data });
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

router.get("/login", function (req, res, next) {
    res.render("login");
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
