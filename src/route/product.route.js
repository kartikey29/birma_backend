const productRoute = require("express").Router();
const upload = require("../utils/personImage");

const {
  getProducts,
  refreshProductList,
} = require("../controller/product.controller");

// Add Product
// productRoute.post("/add-product", upload.single("media"), addProduct);

// // Get Product by Id
// productRoute.get("/get-Product?id=", getProduct);

productRoute.get("/refreshProductList", refreshProductList);

// Get All Product
productRoute.get("/products", getProducts);

module.exports = productRoute;
