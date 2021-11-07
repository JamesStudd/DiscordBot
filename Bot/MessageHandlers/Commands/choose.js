import { RandomElement } from "../Utils/random";

module.exports = {
	name: "choose",
	usagePrefix: '"Option One, Option Two"',
	examplePrefix: '"League of Legends, Valorant"',
	help: "Give it a few options, let the bot decide.",
	command: function (msg, args) {
		var split = msg.content
			.split(",")
			.slice(1)
			.filter((m) => m.trim() != "");

		msg.channel.send(RandomElement(split));
	},
};
