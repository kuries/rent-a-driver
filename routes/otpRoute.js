//importing packages
const nodemailer = require("nodemailer");
const generator = require("generate-password");
const bcrypt = require("bcrypt");

//importing models and express router
const express = require("express");
const otpModel = require("../models/otp");
var router = express.Router();

async function sendOtpMail(details){

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'noreply.rentadriver4@gmail.com',
            pass: 'rentadriver4'
        }
    });
    
    const options = {
        from: 'noreply.rentadriver4@gmail.com',
        to: details.to,
        subject: details.subject,
        text: details.text
    }
    
    transporter.sendMail(options, (err, info) => {
        if(err){
            console.log(err);
            return;
        }
        console.log("Sent: " + info.response);
    })
};

router.post('/login', async (req, res) => {
    console.log(req.body);
    
    const myPlaintextPassword = generator.generate({
        length: 6,
        numbers: true
    });
    const saltRounds = 10;

    var otpBody = {
        email: req.body.email,
    }

    //sending the mail to user
    const details = {
        to: 'beastkun3@gmail.com',
        subject: 'One Time Password (OTP) for user login on rent-a-driver',
        text: `Here is your One Time Password:- ${myPlaintextPassword}`
    }
    await sendOtpMail(details);

    //saving in the database
    bcrypt.hash(myPlaintextPassword, saltRounds, async (err, hash) => {
        otpBody.password = hash;
        const otp = new otpModel(otpBody);

        try {
            await otp.save();
            res.send(otp);
        } catch (error) {
            res.status(500).send(error);
        }
    });
});

router.post("/verify", async (req, res) => {
    otpModel
        .find({email: req.body.email})
        .then(docs => res.json(docs))
        .catch(err => res.send(err));
})


module.exports = router;
