const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	userName: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
	},
	personId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Person",
	},
	role: {
		type: String,
		enum: ["admin", "client", "delivery"],
	},
	notificationToken: {
		type: String,
		default: "",
	},
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
