const mongoose = require("mongoose");

const couponsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
    min:0,
    max:100,
  },
  description: {
    type: String,
    required: true,
  }
})

const Coupons = mongoose.model("Coupons", couponsSchema);

module.exports = Coupons;