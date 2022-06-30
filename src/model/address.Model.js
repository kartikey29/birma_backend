const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  reference: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  personId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
