const fs = require("fs");
const path = require("path");
const { GenericHelpMessage } = require("./../Constants/embeds");
const {
	Settings: { prefix },
} = require("./../Settings/bot");
const { CreateClone } = require("./../Utils/objectExtensions");

const commandFiles = fs
	.readdirSync(path.join(__dirname, "./../Commands/"))
	.filter((file) => file.endsWith(".js"));

export const Commands = {};
export const HelpMessage = CreateClone(GenericHelpMessage);

export function InitializeCommands() {
	commandFiles.forEach((file) => {
		const command = require(path.join(__dirname, `./../Commands/${file}`));

		Commands[command.name] = {
			name: command.name,
			help: command.help,
			usagePrefix: command.usagePrefix,
			examplePrefix: command.examplePrefix,
			execute: command.command,
		};

		console.log(`Loaded command: ${command.name}`);
	});

	HelpMessage.fields.push({
		name: "What is this?",
		value:
			"Just a bunch of random commands to use. Only used in this server so far.",
	});

	HelpMessage.fields.push({
		name: "How do I use it?",
		value: `Use the prefix \`${prefix}\` with a command name. Use the command \`commands\` to get a list of available commands. Use the \`help\` command followed by a command name to get detailed instructions on how to use it.`,
	});

	HelpMessage.fields.push({
		name: "It broke, now what?",
		value: `Message/Abuse James or Jake or fix it yourself by doing a pull request - https://github.com/JamesStudd/DiscordBot`,
	});
}
