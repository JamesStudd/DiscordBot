import { prefix, cooldown } from "./settings.json";
import { parse } from "twemoji";
import { MessageAttachment } from "discord.js";
import UNICODE_EMOJI_REGEX from "./EmojiRegex";

//#region Util
import { RandomElement } from "./../Utils/Utils";
//#endregion

//#region Name Generators
import { GetName } from "./../NameGenerators/Wacky/WackyNameGen";
//#endregion

//#region Image Creators
import {
	CreateCombinedImage,
	CreateMeme,
} from "../ImageCreators/ImageCreators";
//#endregion

//#region Every Noise
import { GetRandomGenre } from "../Spotify/EveryNoiseGenre";
//#endregion

//#region Help Command
import { HelpMessage } from "./HelpCommandEmbed";
//#endregion

const CUSTOM_EMOJI_REGEX = RegExp("<:(\\w+):(\\w+)>");
const OVERRIDES_REGEX = RegExp("^-?[0-9]+,-?[0-9]+,-?[0-9]+,-?[0-9]+");

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
			HandleMessage(msg, command, args);
		}
	}
}

async function HandleMessage(msg, command, args) {
	switch (command) {
		case "combine":
			await HandleCombineCommand(msg, args);
			break;
		case "randomname":
			msg.channel.send(GetName(args[0]));
			break;
		case "meme":
			await HandleMemeCommand(msg, args);
			break;
		case "genre":
			const { genreName, link } = GetRandomGenre(args[0]);
			let capitalized = CapitalizeFirstLetters(genreName);
			msg.channel.send(`Why not try **${capitalized}**? -- ${link}`);
			break;
		case "help":
			msg.channel.send({ embed: HelpMessage });
			break;
	}
}

async function HandleCombineCommand(msg, args) {
	let emojis = [];
	for (const arg of args) {
		const { emoji, overrides } = CheckOverridesExist(arg);
		if (CUSTOM_EMOJI_REGEX.test(emoji)) {
			let exec = CUSTOM_EMOJI_REGEX.exec(emoji);
			let emojiId = exec[2];
			emojis.push({
				type: "custom",
				id: emojiId,
				overrides,
			});
		} else if (UNICODE_EMOJI_REGEX.test(emoji)) {
			let icon = await RetrieveEmojiFromTwemoji(emoji);
			emojis.push({
				type: "inbuilt",
				id: icon,
				overrides,
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

function CapitalizeFirstLetters(sentence) {
	return sentence.replace(/(^\w{1})|(\s{1}\w{1})/g, (match) =>
		match.toUpperCase()
	);
}

async function RetrieveEmojiFromTwemoji(arg) {
	return new Promise((resolve, reject) => {
		try {
			parse(arg, (icon) => {
				resolve(icon);
			});
		} catch (err) {
			reject(err);
		}
	});
}
