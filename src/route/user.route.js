const userRoute = require("express").Router();

const {
  getUserById,
  editProfile,
  addAddress,
  getUserAddress,
  deleteAddress,
} = require("../controller/user.controller");

userRoute.get("/getUserById", getUserById);

userRoute.patch("/editProfile", editProfile);

userRoute.post("/addAddress", addAddress);

userRoute.get("/getUserAddress", getUserAddress);

userRoute.delete("/deleteAddress", deleteAddress);

module.exports = userRoute;
