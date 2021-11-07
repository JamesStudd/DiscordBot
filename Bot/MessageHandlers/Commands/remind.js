import { GetIdFromMention } from "../Utils/getIdFromMention";
import { Settings } from "./../Settings/bot";

const chrono = require("chrono-node");
const moment = require("moment");
const Reminder = require("../../Database/Models/reminderModel");
const { nanoid } = require("nanoid");

module.exports = {
	name: "remind",
	usagePrefix:
		'[me / @person] [words describing the interval/date] "message"',
	examplePrefix: `me in 1 hour "take the bins out"\n${Settings.prefix}remind @lyons tomorrow 8am "fix bot"`,
	help:
		'Creates a reminder with a custom message. Can @ other people to set a reminder for them. Use this as a reference for how to input length of time https://www.npmjs.com/package/chrono-node. Things like `?remind me next tuesday 3pm "meeting"`.',
	command: function (msg, args) {
		let author = msg.author.id;
		let targetId = msg.author.id;
		const [target, ...rest] = args;
		const inputString = rest.join(" ");

		const [inputDate, inputText] = inputString.split('"');
		const parsedDate = chrono.parseDate(inputDate);

		if (target !== "me") {
			let targetMember = GetIdFromMention(target, msg);
			if (targetMember) {
				targetId = targetMember;
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

		const ID = nanoid(10);

		let newReminder = new Reminder({
			author,
			user: targetId,
			text: inputText,
			date: parsedDate,
			channel: msg.channel.id,
			ID,
		});

		newReminder
			.save()
			.then((_) => {
				msg.channel.send(
					`Reminder set for <@${targetId}>\nDate: ${parsedDate}.\nID: \`${ID}\`. Use command ?deleteReminder {id} to delete reminder.`
				);
			})
			.catch((err) => {
				console.log(err);
			});
	},
};
