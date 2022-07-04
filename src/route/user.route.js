const userRoute = require("express").Router();
const { verifyToken } = require("../middleware/middleware");
const {
  addUser,
  getAllUser,
  getUserById,
  editProfile,
  addAddress,
  getUserAddress,
  deleteAddress,
  loginUser,
} = require("../controller/user.controller");

userRoute.post("/addUser", addUser);

userRoute.post("/login", loginUser);

userRoute.get("/getAllUser", getAllUser);

userRoute.get("/getUserById", getUserById);

userRoute.patch("/editProfile", verifyToken, editProfile);

userRoute.post("/addAddress", addAddress);

userRoute.get("/getUserAddress", getUserAddress);

userRoute.delete("/deleteAddress", deleteAddress);

module.exports = userRoute;
