const productRoute = require("express").Router();
const upload = require("../utils/personImage");

const {
  getProducts,
  refreshProductList,
  getProductById
} = require("../controller/product.controller");

productRoute.get("/refreshProductList", refreshProductList);

productRoute.get("/getProducts", getProducts);

productRoute.get("/getProduct/:_id", getProductById)

module.exports = productRoute;
