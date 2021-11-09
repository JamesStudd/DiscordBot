import { Commands } from "./../Utils/commands";

module.exports = {
	name: "commands",
	help: "Gives a list of commands.",
	command: function (msg, args) {
		msg.channel.send(`Commands: ${Object.keys(Commands).join(", ")}.`);
	},
};
