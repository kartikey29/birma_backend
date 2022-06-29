const productRoute = require("express").Router();
const multer = require("multer");
const hash = require("random-hash");
const path = require("path");
const {
	addProduct,
	getProduct,
	getAllProduct,
} = require("../controller/product.controller");

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

// Add Product
productRoute.post("/add-product", upload.single("media"), addProduct);

// Get Product by Id
productRoute.get("/get-Product?id=", getProduct);

// Get All Product
productRoute.get("/products", getAllProduct);

module.exports = productRoute;
