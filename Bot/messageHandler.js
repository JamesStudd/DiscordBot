const fs = require("fs");
const path = require("path");

const {
	Settings: { prefix, cooldown },
} = require("./MessageHandlers/Settings/bot");

const { HelpMessage } = require("./MessageHandlers/Settings/help");

const commands = {
	help: function (msg, args) {
		msg.channel.send({ embed: HelpMessage });
	},
};

const commandFiles = fs
	.readdirSync(path.join(__dirname, "MessageHandlers/Commands"))
	.filter((file) => file.endsWith(".js"));

commandFiles.forEach((file) => {
	const command = require(path.join(
		__dirname,
		`./MessageHandlers/Commands/${file}`
	));
	commands[command.name] = command.command;

	HelpMessage.fields.push({
		name: `${prefix}${command.name}`,
		value: command.help,
	});

	console.log(`Loaded command: ${command.name}`);
});

let nextMessageAllowed = 0;

export function ProcessMessage(msg) {
	if (msg.author.bot || !msg.content)
		return;

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
			if (commands[command]) {
				commands[command](msg, args);
			}
			// TODO: Work out which command they meant if the command is slightly wrong?
		}
	}
}
