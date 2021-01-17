const chrono = require("chrono-node");
const moment = require("moment");
const Reminder = require("../../Database/Models/reminderModel");

module.exports = {
	name: "remindme",
	help:
		'Creates a reminder with a custom message. E.G. `?remindme in 1 hour "Take the bins out."`. Use this as a reference for how to input length of time https://www.npmjs.com/package/chrono-node. Things like `?remindme next tuesday 3pm "meeting"`.',
	command: function (msg, args) {
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
	},
};
