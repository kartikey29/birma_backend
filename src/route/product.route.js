const productRoute = require("express").Router();
const upload = require("../utils/personImage");
const verifyToken = require("../middleware/middleware");

const {
  getProducts,
  refreshProductList,
  getProductById,
  rateProduct,
} = require("../controller/product.controller");

productRoute.get("/refreshProductList", refreshProductList);

productRoute.get("/getProducts", getProducts);

productRoute.get("/getProduct/:_id", getProductById)

//productRoute.patch("/rateProduct/:_id", verifyToken, rateProduct);

module.exports = productRoute;
