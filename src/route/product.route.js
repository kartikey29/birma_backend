const productRoute = require("express").Router();

const { addProduct } = require("../controller/product.controller");

productRoute.post("/add=product", addProduct);

module.exports = productRoute;
