import { RandomElement } from "../Utils/randomElement";

module.exports = {
	name: "choose",
	help:
		'Give it a few options with "option" format, let the bot decide ur life.',
	command: function (msg, args) {
		var split = msg.content
			.split('"')
			.slice(1)
			.filter((m) => m.trim() != "");

		msg.channel.send(RandomElement(split));
	},
};
