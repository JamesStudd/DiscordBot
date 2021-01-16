const fs = require("fs");
const path = require("path");

import settings from "./settings";

const { prefix, cooldown } = settings;

const commands = {};

const commandFiles = fs
	.readdirSync(path.join(__dirname, "MessageHandlers"))
	.filter((file) => file.endsWith(".js"));

commandFiles.forEach((file) => {
	const command = require(path.join(__dirname, `./MessageHandlers/${file}`));
	const commandName = file.split(".")[0];
	commands[commandName] = command;
	console.log(`Loaded command: ${commandName}`);
});

let nextMessageAllowed = 0;

export function ProcessMessage(msg) {
	if (!msg.author.bot && msg.content && msg.content[0] === prefix) {
		const args = msg.content.slice(prefix.length).trim().split(" ");
		const command = args.shift().toLowerCase();

		let date = new Date();
		if (date.getTime() > nextMessageAllowed) {
			nextMessageAllowed = date.getTime() + cooldown;
			console.log(
				`Command \"${command}\" executed by ${
					msg.author.username
				} at ${date.toLocaleString()}`
			);
			if (commands[command]) {
				commands[command](msg, args);
			}
			// TODO: Work out which command they meant if the command is slightly wrong?
		}
	}
}
