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

    const otpBody = {
        email: req.body.email,
    }

    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
        otpBody.password = hash;
    });

    const otp = new otpModel(otpBody);

    const details = {
        to: 'beastkun3@gmail.com',
        subject: 'One Time Password (OTP) for user login on rent-a-driver',
        text: `Here is your One Time Password ${myPlaintextPassword}`
    }

    try {
		await otp.save();
        sendOtpMail(details);
		res.send(otp);
	} catch (error) {
		res.status(500).send(error);
	}
});


module.exports = router;
