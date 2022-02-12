const mongoose = require("mongoose");

const DealerSchema = new mongoose.Schema({
  name: {
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
  materialNature: {
    type: String,
    required: true,
    maxLength: 100,
    default: "",
  },
  materialWeight: {
    type: Number,
    required: true,
    default: 0,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  city: {
    type: String,
    required: true,
    maxLength: 50,
    default: "",
  },
  state: {
    type: String,
    required: true,
    default: "",
  },
});


const Dealer = mongoose.model("Dealer", DealerSchema);

module.exports = Dealer;