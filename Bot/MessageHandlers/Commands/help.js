import { Commands, HelpMessage } from "./../Utils/commands";
import { CreateHelpCommandEmbed } from "./../Utils/embeds";

module.exports = {
	name: "help",
	usage: "[optional_other_command]",
	example: "combine",
	help:
		"Gives general help, or usage of a specific command if an argument is supplied.",
	command: async function (msg, args) {
		if (args.length > 0) {
			var command = Commands[args[0]];
			if (command) {
				msg.channel.send({ embed: CreateHelpCommandEmbed(command) });
			}
			return;
		}
		msg.channel.send({ embed: HelpMessage });
	},
};
