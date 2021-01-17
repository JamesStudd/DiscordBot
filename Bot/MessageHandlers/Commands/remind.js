const chrono = require("chrono-node");
const moment = require("moment");
const Reminder = require("../../Database/Models/reminderModel");

function getUserFromMention(mention, msg) {
	if (mention.startsWith("<@") && mention.endsWith(">")) {
		mention = mention.slice(2, -1);

		let type;

		if (mention.startsWith("!")) {
			type = "user";
			mention = mention.slice(1);
		} else if (mention.startsWith("&")) {
			type = "role";
			mention = mention.slice(1);
		}

		switch (type) {
			case "user":
				const foundUser = msg.channel.members.find(
					(member) => member.user.id === mention
				);
				return foundUser ? foundUser.user.id : undefined;
			case "role":
				const foundRole = msg.channel.guild.roles.cache.find(
					(role) => role.id === mention
				);
				return foundRole ? `&${foundRole.id}` : undefined;
			default:
				return undefined;
		}
	}
}

module.exports = {
	name: "remind",
	help:
		'Creates a reminder with a custom message. E.G. `?remind me in 1 hour "Take the bins out."`. Can @ other people to set a reminder for them - `?remind @Dinky in 1 hour "u mad cute dog x."`. Use this as a reference for how to input length of time https://www.npmjs.com/package/chrono-node. Things like `?remind me next tuesday 3pm "meeting"`.',
	command: function (msg, args) {
		let id = msg.author.id;
		const [target, ...rest] = args;
		const inputString = rest.join(" ");

		const [inputDate, inputText] = inputString.split('"');
		const parsedDate = chrono.parseDate(inputDate);

		if (target !== "me") {
			let targetMember = getUserFromMention(target, msg);
			if (targetMember) {
				id = targetMember;
			}
		}

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

		parsedDate.setSeconds(0, 0);

		let newReminder = new Reminder({
			user: id,
			text: inputText,
			date: parsedDate,
			channel: msg.channel.id,
		});

		newReminder
			.save()
			.then((_) => {
				msg.channel.send(
					`Reminder set for <@${id}>\nDate: ${parsedDate}.`
				);
			})
			.catch((err) => {
				console.log(err);
			});
	},
};
