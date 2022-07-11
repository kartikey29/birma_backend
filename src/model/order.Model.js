const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const orderSchema = new mongoose.Schema(
  {
    clientID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    deliveryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "PAID OUT",
    },
    receipt: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    payType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

orderSchema.plugin(paginate);

orderSchema.index({ name: "text", title: "text" });
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
