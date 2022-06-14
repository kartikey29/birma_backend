const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
	name: {
		tyoe: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});

const Category = mongoose.model("Category ", categoriesSchema);

module.exports = { Category };
