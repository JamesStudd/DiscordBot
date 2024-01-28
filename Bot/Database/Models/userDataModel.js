const mongoose = require("../database");

let UserData = undefined;
if (
	(mongoose.connection && mongoose.connection.readyState == 1) ||
	mongoose.connection.readyState == 2
) {
	let userSchema = mongoose.Schema({
		user: {
			type: String,
			required: true,
		},
		thanksGiven: {
			type: Number,
			required: false,
		},
		timesLucky: {
			type: Number,
			required: false,
		},
	});

	UserData = mongoose.model("User", userSchema);
}

module.exports = UserData;
