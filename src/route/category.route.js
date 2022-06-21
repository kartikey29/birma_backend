const categoryRoute = require("express").Router();

const {
	postCategory,
	getCategory,
} = require("../controller/category.controller");

categoryRoute.get("/category", getCategory);

categoryRoute.post("/insert-category", postCategory);

module.exports = categoryRoute;
