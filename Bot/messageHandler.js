import settings from "./settings";

const { prefix, cooldown } = settings;

const combine = require("./MessageHandlers/combine");
const meme = require("./MessageHandlers/meme");
const genre = require("./MessageHandlers/genre");
const help = require("./MessageHandlers/help");
const randomname = require("./MessageHandlers/randomname");

const Handlers = {
	combine,
	meme,
	genre,
	help,
	randomname,
};

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
			Handlers[command](msg, args);
		}
	}
}
