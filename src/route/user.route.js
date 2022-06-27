const userRoute = require("express").Router();

const { getUserById } = require("../controller/user.controller");

userRoute.get("/getUserById", getUserById);

module.exports = userRoute;
