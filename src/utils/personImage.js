const multer = require("multer");
const path = require("path");
const hash = require("random-hash");

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

// const storage = multer.diskStorage({
// 	destination: async (req, file, cb) => {
// 		cb(null, path.join(__dirname, "../public/image"), async (err, success) => {
// 			if (err) throw err;
// 		});
// 	},
// 	filename: async (req, file, cb) => {
// 		const name = Date.now() + "-" + file.originalname;
// 		cb(null, name, async (error, success) => {
// 			if (error) throw error;
// 		});
// 	},
// });

// const upload = multer({ storage: storage });

module.exports = upload;
