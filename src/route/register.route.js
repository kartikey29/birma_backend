const registerRoute = require("express").Router();
const registeration = require("../controller/registeration.controller");

const multer = require("multer");
const hash = require("random-hash");
const path = require("path");

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

registerRoute.post(
  "/register-delivery",
  upload.single("image"),
  registeration.registerDelivery
);

registerRoute.post(
  "/register-client",
  upload.single("image"),
  registeration.registerClient
);

module.exports = registerRoute;
