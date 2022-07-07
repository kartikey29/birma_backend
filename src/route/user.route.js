const userRoute = require("express").Router();
const upload = require("../utils/personImage");

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

userRoute.get("/getUserById", verifyToken, getUserById);

userRoute.patch(
  "/editProfile",
  verifyToken,
  upload.single("image"),
  editProfile
);

userRoute.post("/addAddress", addAddress);

userRoute.get("/getUserAddress/:_id", getUserAddress);

userRoute.delete("/deleteAddress/:_id", deleteAddress);

module.exports = userRoute;
