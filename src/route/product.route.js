const productRoute = require("express").Router();
const upload = require('../utils/personImage');


const {
	addProduct,
	getProduct,
	getAllProduct,
} = require("../controller/product.controller");

// Add Product
productRoute.post("/add-product", upload.single("media"), addProduct);

// Get Product by Id
productRoute.get("/get-Product?id=", getProduct);

// Get All Product
productRoute.get("/products", getAllProduct);

module.exports = productRoute;
