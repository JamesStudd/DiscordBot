const chrono = require("chrono-node");
const moment = require("moment");
const Reminder = require("../../Database/Models/reminderModel");

module.exports = function (msg, args) {
	const user = msg.author.id;
	const inputString = args.join(" ");

	const [inputDate, inputText] = inputString.split('"');
	const parsedDate = chrono.parseDate(inputDate);

	if (!parsedDate) {
		return;
	}

	const momentDate = moment(parsedDate);
	const momentNow = moment();

	if (
		momentDate.isBefore(momentNow) ||
		Math.ceil(momentDate.diff(momentNow, "minutes", true)) <= 4
	) {
		return;
	}

	let newReminder = new Reminder({
		user,
		text: inputText,
		date: parsedDate,
		channel: msg.channel.id,
	});

	newReminder
		.save()
		.then((_) => {
			msg.channel.send(
				`Reminder set for <@${msg.author.id}>\nDate: ${parsedDate}.`
			);
		})
		.catch((err) => {
			console.log(err);
		});
};
