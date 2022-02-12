const nodemailer = require("nodemailer");

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

async function sendOtp(mailId){

}


module.exports = {sendOtpMail, sendOtp};
