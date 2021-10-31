import { RandomElement } from "../Utils/randomElement";

module.exports = {
	name: "choose",
	help: "Chooses between some options",
	command: function (msg, args) {
		var split = msg.content
			.split('"')
			.slice(1)
			.filter((m) => m.trim() != "");

		msg.channel.send(RandomElement(split));
	},
};
