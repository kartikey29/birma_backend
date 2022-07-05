const categoryRoute = require("express").Router();

const {
	postCategory,
	getAllCategory,
} = require("../controller/category.controller");

categoryRoute.get("/getAllCategory", getAllCategory);

categoryRoute.post("/insert-category", postCategory);

module.exports = categoryRoute;
