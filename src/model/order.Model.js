const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
	{
		clientID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Person",
		},
		deliveryId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Person",
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
	{ timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order };
