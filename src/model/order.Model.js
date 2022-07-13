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
    amount: {
      type: Number,
      required: true,
    },
    payType: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    delivery: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  },
  { timestamps: true }
);

orderSchema.plugin(paginate);

orderSchema.index({ name: "text", title: "text" });
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
