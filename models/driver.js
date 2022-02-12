const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "",
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    default: 18,
  },
  truckNo: {
    type: String,
    required: true,
    default: "",
  },
  mobileNo: {
    type: String,
    required: true,
    maxLength: 10,
    default: "",
  },
  truckCapacity: {
    type: Number,
    required: true,
    default: 0,
  },
  transpoterName: {
    type: String,
    required: true,
    maxLength: 50,
    default: "",
  },
  drivingExp: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  routes: {
    type: [[String]],
    required: true,
    default: [['', '']],
  },
});


const Driver = mongoose.model("Driver", DriverSchema);

module.exports = Driver;