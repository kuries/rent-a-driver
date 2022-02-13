const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const OtpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, expires: '5m', default: Date.now }
    ,
    designation:    {
        type: String,
    
    }
});

// const Otp = mongoose.model('Otp', OtpSchema);

// module.exports = Otp;

// Export Model
// User.plugin(passportLocalMongoose);

module.exports = mongoose.model('Otp', OtpSchema);
