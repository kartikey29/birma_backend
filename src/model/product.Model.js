const mongoose = require("mongoose");
Schema = mongoose.Schema;

// const MediaSchema = new Schema({
// 	url: String,
// 	type: { type: String, enum: ["image"] },
// });

const productSchema = new mongoose.Schema(
	{
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
		media: {
			type: [],
			required: [true, "Uploaded file must have a name & extension"],
		},
		CategoryId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: true,
		},
	},
	{
		timestamps: true,
		toObject: { getters: true },
		toJSON: { getters: true },
	},
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
