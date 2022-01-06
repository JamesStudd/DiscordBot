import { InitializeCommands, Commands } from "./MessageHandlers/Utils/commands";

const {
	Settings: { prefix, cooldown },
} = require("./MessageHandlers/Settings/bot");

let nextMessageAllowed = 0;

InitializeCommands();

function GetUserHasScope(command, user) {
	let hasScope = false;

	for (let i = 0; i < command.scopes.length; i++) {
		const scope = command.scopes[i];
		hasScope = hasScope || scope.conditions(user);
	}

	return hasScope;
}

export function ProcessMessage(msg) {
	if (msg.author.bot || !msg.content) return;

	if (msg.content[0] === prefix) {
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

			const foundCommand = Commands[command];
			if (foundCommand && GetUserHasScope(foundCommand, msg.member)) {
				foundCommand.execute(msg, args);
			}
		}
	}
}
