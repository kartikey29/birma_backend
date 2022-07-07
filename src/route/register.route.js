const registerRoute = require("express").Router();
const registeration = require("../controller/registeration.controller");
const upload = require('../utils/personImage');

// route to register both delivery and client
registerRoute.post(
  "/register-delivery-client",
  upload.single("image"),
  registeration.registerDelivery
);

// registerRoute.post(
//   "/register-client",
//   upload.single("image"),
//   registeration.registerClient
// );

module.exports = registerRoute;