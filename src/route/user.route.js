const userRoute = require("express").Router();

const {
  addUser,
  getAllUser,
  getUserById,
  editProfile,
  addAddress,
  getUserAddress,
  deleteAddress,
} = require("../controller/user.controller");

userRoute.post("/addUser", addUser);

userRoute.get("/getAllUser", getAllUser);

userRoute.get("/getUserById", getUserById);

userRoute.patch("/editProfile", editProfile);

userRoute.post("/addAddress", addAddress);

userRoute.get("/getUserAddress", getUserAddress);

userRoute.delete("/deleteAddress", deleteAddress);

module.exports = userRoute;
