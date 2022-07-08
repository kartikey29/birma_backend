const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
Schema = mongoose.Schema;

// const MediaSchema = new Schema({
// 	url: String,
// 	type: { type: String, enum: ["image"] },
// });

const productSchema = new mongoose.Schema(
  {
    Category: {
      type: String,
    },
    BrandName: {
      type: String,
    },
    ItemName: {
      type: String,
    },
    TITLE: {
      type: String,
    },
    ProductDescription: {
      type: String,
    },
    TechnicalSpecifications: {
      type: String,
    },
    MaximumRetailPrice: {
      type: String,
    },
    OurPrice: {
      type: String,
    },
    ProductLink: {
      type: String,
    },
    Images: {
      type: [],
    },
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

productSchema.plugin(mongoosePaginate);

productSchema.index({ name: "text", title: "text" });
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
