//importing packages
const nodemailer = require("nodemailer");
const generator = require("generate-password");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");

//importing models and express router
const express = require("express");
const otpModel = require("../models/otp");
const DealerModel = require("../models/dealer");
const DriverModel = require("../models/driver");
const app = require("../app");

var router = express.Router();

async function sendOtpMail(details) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_ID,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    const options = {
        from: "noreply.rentadriver4@gmail.com",
        to: details.to,
        subject: details.subject,
        text: details.text,
    };

    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err);
            return;
        }
        // console.log("Sent: " + info.response);
    });
}

router.get("/login/:designation", async (req, res) => {
    const params = req.params;
    if (params.designation == "driver" || params.designation == "dealer")
        res.render("otpLogin", { result: params });
    else console.log("error");
});

router.post("/login", async (req, res) => {
    // console.log(req.body);
    var checkmail = req.body.email;

    //check the dealer and driver db
    var ret_dealer = await DealerModel.findOne({ email: checkmail }).exec();

    var ret_driver = await DriverModel.findOne({ email: checkmail }).exec();
    if (!ret_dealer && !ret_driver) {
        req.flash("error", "Email not registered!");
        return res.redirect("/");
    }
    if (!ret_driver && req.body.designation == "driver") {
        req.flash("error", "Email not registered as a driver!");
        return res.redirect("/");
    }
    if (!ret_dealer && req.body.designation == "dealer") {
        req.flash("error", "Email not registered as a dealer!");
        return res.redirect("/");
    }

    const myPlaintextPassword = generator.generate({
        length: 6,
        numbers: true,
    });
    const saltRounds = 10;

    var otpBody = {
        email: req.body.email,
        designation: req.body.designation,
    };

    //sending the mail to user
    const details = {
        to: req.body.email,
        subject: "One Time Password (OTP) for user login on rent-a-driver",
        text: `Here is your One Time Password:- ${myPlaintextPassword}`,
    };
    console.log(myPlaintextPassword);
    await sendOtpMail(details);

    doc = await otpModel.findOne({email:req.body.email}).exec();
    if(doc)
    {
        await otpModel.deleteOne({email:req.body.email}).exec();
    }


    //saving in the database
    bcrypt.hash(myPlaintextPassword, saltRounds, async (err, hash) => {
        otpBody.password = hash;
        const otp = new otpModel(otpBody);

        try {
            await otp.save();
            res.render("otpVerify", { email: req.body.email, flashMessage: req.flash("error")});
        } catch (error) {
            res.status(500).send(error);
        }
    });
});

router.post("/verify", async (req, res) => {
    var email, designation;
    var result = otpModel
        .findOne({ email: req.body.email })
        .then((docs) => {
            email = docs.email;
            designation = docs.designation;
            return docs;
        })
        .catch((err) => res.send(err));

    var isValid = await result.then((docs) => {
        console.log(typeof docs);
        console.log(docs.password);
        return bcrypt
            .compare(req.body.password, docs.password)
            .then((result) => {
                return result;
            })
            .catch((err) => console.log(err));
    });
    console.log(isValid);
    if (isValid) {
        console.log(email, designation);
        req.session.email = email;
        req.session.designation = designation;
        req.session.save();
        res.redirect("/");
    } else {
        req.flash("error", "Wrong OTP entered!");
        res.render('otpVerify', { email: req.body.email, flashMessage: req.flash("error")});
        console.log("err");
    }
});

router.post("/resend",async (req, res, next)=>
{
    var checkmail = req.body.email;
    var designation;

    doc = await otpModel.findOne({email: checkmail}).exec();
    
    if(doc)
    {
        designation = doc.designation;
        await otpModel.deleteOne({email: checkmail}).exec();
    }
    else
    {
        return res.redirect('/');
    }

    const myPlaintextPassword = generator.generate({
        length: 6,
        numbers: true,
    });
    const saltRounds = 10;

    var otpBody = {
        email: checkmail,
        designation: designation,
    };

    //sending the mail to user
    const details = {
        to: checkmail,
        subject: "One Time Password (OTP) for user login on rent-a-driver",
        text: `Here is your One Time Password:- ${myPlaintextPassword}`,
    };
    console.log(myPlaintextPassword);
    await sendOtpMail(details);

    //saving in the database
    bcrypt.hash(myPlaintextPassword, saltRounds, async (err, hash) => {
        otpBody.password = hash;
        const otp = new otpModel(otpBody);

        try {
            await otp.save();
            res.render("otpVerify", { email: checkmail});
        } catch (error) {
            res.status(500).send(error);
        }
    });

})

module.exports = router;
