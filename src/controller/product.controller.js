const { Product } = require("../model/product.Model");

const addProduct = async (req, res) => {
	try {
		const { productName, description, price, status, image, CategoryId } =
			req.body;

		const insertData = await Product({
			productName,
			description,
			price,
			status,
			image,
			CategoryId,
		});

		console.log(insertData);
		// await insertData.save();
	} catch (error) {
		return res.status(500).json({
			error: error.message,
			success: false,
			data: [],
		});
	}
};

module.exports = { addProduct };
