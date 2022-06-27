const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  description: {
    required: true,
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
  },
  CategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
