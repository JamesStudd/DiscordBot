import { prefix, cooldown } from "./settings.json";
import { parse } from "twemoji";
import { MessageAttachment } from "discord.js";
const emojiRegex = require("emoji-regex/RGI_Emoji");

//#region Name Generators
import { GetName } from "./../NameGenerators/Wacky/WackyNameGen";
import { Utils } from "./../NameGenerators/Utils/Utils";
//#endregion

//#region Image Creators
import {
	CreateCombinedImage,
	CreateMeme,
} from "../ImageCreators/ImageCreators";
//#endregion

//#region Help Command
import { HelpMessage } from "./HelpCommandEmbed";
//#endregion

const CUSTOM_EMOJI_REGEX = RegExp("<:(\\w+):(\\w+)>");
const UNICODE_EMOJI_REGEX = emojiRegex();
const OVERRIDES_REGEX = RegExp("^-?[0-9]+,-?[0-9]+,-?[0-9]+,-?[0-9]+");

let nextMessageAllowed = 0;

export function ProcessMessage(msg) {
	if (!msg.author.bot && msg.content && msg.content[0] === prefix) {
		const args = msg.content.slice(prefix.length).trim().split(" ");
		const command = args.shift().toLowerCase();

		if (Date.now() > nextMessageAllowed) {
			nextMessageAllowed = Date.now() + cooldown;
			HandleMessage(msg, command, args);
		}
	}
}

async function HandleMessage(msg, command, args) {
	switch (command) {
		case "combine":
			return await HandleCombineCommand(msg, args);
		case "randomname":
			msg.channel.send(GetName());
			break;
		case "meme":
			return await HandleMemeCommand(msg, args);
		case "help":
			msg.channel.send({ embed: HelpMessage });
			break;
	}
}

async function HandleCombineCommand(msg, args) {
	let emojis = [];
	for (const arg of args) {
		let result = CheckOverridesExist(arg);
		if (CUSTOM_EMOJI_REGEX.test(result.emoji)) {
			let exec = CUSTOM_EMOJI_REGEX.exec(result.emoji);
			let emojiId = exec[2];
			emojis.push({
				type: "custom",
				id: emojiId,
				overrides: result.overrides,
			});
		} else if (UNICODE_EMOJI_REGEX.test(result.emoji)) {
			let icon = await RetrieveEmojiFromTwemoji(result.emoji);
			emojis.push({
				type: "inbuilt",
				id: icon,
				overrides: result.overrides,
			});
		}
	}
	let image = await CreateCombinedImage(emojis);
	msg.channel.send("", {
		files: [new MessageAttachment(image, "combined.png")],
	});
}

async function HandleMemeCommand(msg, args) {
	let emojiName = args[0];
	let emoji = {};
	if (CUSTOM_EMOJI_REGEX.test(emojiName)) {
		let exec = CUSTOM_EMOJI_REGEX.exec(emojiName);
		let emojiId = exec[2];
		emoji = { type: "custom", id: emojiId };
	} else if (UNICODE_EMOJI_REGEX.test(emojiName)) {
		let icon = await RetrieveEmojiFromTwemoji(emojiName);
		emoji = { type: "inbuilt", id: icon };
	}

	let firstLine = args.slice(1, args.indexOf("-")).join(" ");
	let secondLine = args.slice(args.indexOf("-") + 1).join(" ");

	let image = await CreateMeme(firstLine, secondLine, emoji);
	msg.channel.send("", { files: [new MessageAttachment(image, "meme.png")] });
}

function CheckOverridesExist(arg) {
	let overrideIndex = arg.indexOf("(");
	let emojiName = arg;
	if (overrideIndex !== -1) {
		emojiName = arg.slice(0, overrideIndex);
		let override = arg.slice(overrideIndex).slice(1, -1);

		if (OVERRIDES_REGEX.test(override)) {
			let arr = override.split(",");
			arr = arr.map((n) => {
				return parseInt(n);
			});
			return { emoji: emojiName, overrides: arr };
		}
	}
	return { emoji: emojiName, overrides: null };
}

async function RetrieveEmojiFromTwemoji(arg) {
	return new Promise((resolve, reject) => {
		try {
			parse(arg, (icon) => {
				resolve(icon);
			});
		} catch (error) {
			reject({ error: "emoji not found" });
		}
	});
}
