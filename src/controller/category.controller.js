const Category = require("../model/categories.Model");

const postCategory = async (req, res, next) => {
	const { name, description } = req.body;

	const insertData = await Category({
		name,
		description,
	});
	await insertData.save();

	return res.status(200).json({
		success: true,
		message: "Data Inserted Successfully",
		data: insertData,
	});
};

const getAllCategory = async (req, res, next) => {
	const fetchData = await Category.find({});

	return res.status(200).json({
		success: true,
		message: "Data Successfully Fetched ",
		data: [fetchData],
	});
};

module.exports = { postCategory, getAllCategory };
