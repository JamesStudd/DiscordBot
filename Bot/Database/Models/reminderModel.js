const mongoose = require("../database");

let Reminder = undefined;
if (
	(mongoose.connection && mongoose.connection.readyState == 1) ||
	mongoose.connection.readyState == 2
) {
	let reminderSchema = mongoose.Schema({
		author: {
			type: String,
			required: true,
		},
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
		ID: {
			type: String,
			required: true,
		},
	});

	Reminder = mongoose.model("Reminder", reminderSchema);
}

module.exports = Reminder;
