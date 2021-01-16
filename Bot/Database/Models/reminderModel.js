const mongoose = require("../database");

let Reminder = undefined;
if (
	(mongoose.connection && mongoose.connection.readyState == 1) ||
	mongoose.connection.readyState == 2
) {
	let reminderSchema = mongoose.Schema({
		user: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		channel: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
	});

	Reminder = mongoose.model("Reminder", reminderSchema);
}

module.exports = Reminder;
