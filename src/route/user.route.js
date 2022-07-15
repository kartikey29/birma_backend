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
  editAddress,
  sendNotification,
} = require("../controller/user.controller");

const { verify } = require("jsonwebtoken");

userRoute.post("/addUser", upload.single("image"), addUser);

userRoute.post("/login", loginUser);

userRoute.get("/getAllUser", getAllUser);

userRoute.get("/getUserById", verifyToken, getUserById);

userRoute.patch(
  "/editProfile",
  verifyToken,
  upload.single("image"),
  editProfile
);

userRoute.post("/addAddress", verifyToken, addAddress);

userRoute.patch("/editAddress/:_id", verifyToken, editAddress);

userRoute.get("/getUserAddress", verifyToken, getUserAddress);

userRoute.delete("/deleteAddress", verifyToken, deleteAddress);

userRoute.post("/firebase/notification", sendNotification);

module.exports = userRoute;
