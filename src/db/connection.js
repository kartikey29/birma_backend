const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE, async () => {
	try {
		console.log("Database is Connected succesfully");
	} catch (error) {
		console.log(error);
	}
});
