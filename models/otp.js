const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
    email: String,
    password: String,
    createdAt: { type: Date, expires: '5m', default: Date.now }
});

const Otp = mongoose.model('Otp', OtpSchema);

module.exports = Otp;