const multer = require("multer");
const hash = require("random-hash");
const path = require("path");
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

//Multer Storage
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, "../../public/product"));
	},
	filename: function (req, file, cb) {
		let temp = file.originalname.split(".");
		const filename =
			temp[0] + "-" + hash.generateHash({ length: 5 }) + "." + temp[1];
		cb(null, filename);
	},
});

const fileFilter = function (req, file, callback) {
	var ext = path.extname(file.originalname);
	if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
		return callback(new Error("Only images are allowed"));
	}
	callback(null, true);
};

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
	fileFilter: fileFilter,
});

userRoute.post("/addUser", addUser);

userRoute.post("/login", loginUser);

userRoute.get("/getAllUser", getAllUser);

userRoute.get("/getUserById", verifyToken, getUserById);

userRoute.patch("/editProfile", verifyToken, editProfile);

userRoute.post("/addAddress", addAddress);

userRoute.get("/getUserAddress/:_id", getUserAddress);

userRoute.delete("/deleteAddress/:_id", deleteAddress);

module.exports = userRoute;
