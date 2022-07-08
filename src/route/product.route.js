const productRoute = require("express").Router();
const upload = require("../utils/personImage");

const {
  getProducts,
  refreshProductList,
} = require("../controller/product.controller");

productRoute.get("/refreshProductList", refreshProductList);

productRoute.get("/getProducts", getProducts);

module.exports = productRoute;
