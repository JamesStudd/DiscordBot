require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(
	process.env.NODE_ENV === "production"
		? process.env.MONGODB_URI
		: process.env.MONGODB_URI_DEV,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
		if (err) {
			console.error(
				"Database error, check credentials and restart server"
			);
		}
	}
);

module.exports = mongoose;
