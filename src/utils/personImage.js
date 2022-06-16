const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: async (req, file, cb) => {
		cb(null, path.join(__dirname, "../public/image"), async (err, success) => {
			if (err) throw err;
		});
	},
	filename: async (req, file, cb) => {
		const name = Date.now() + "-" + file.originalname;
		cb(null, name, async (error, success) => {
			if (error) throw error;
		});
	},
});

const upload = multer({ storage: storage });

module.exports = upload;
