const mongoose = require("mongoose");

const mongoosePaginate = require("mongoose-paginate-v2");

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rating: {
      type: Number,
      required: [true, "A rating is required."],
      min: [1, 'A minimum rating of "1" is required.'],
      max: [5, '"5" is the maximum rating.'],
    },
    review: { type: String },
  },
  { timestamps: true }
);

reviewSchema.plugin(mongoosePaginate);

const Review = mongoose.model("review", reviewSchema);

module.exports = Review;
