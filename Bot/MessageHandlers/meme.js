import { CreateMeme } from "./Generators/Images/imageCreators";
import { MessageAttachment } from "discord.js";

const GetEmojiFromInput = require("./Utils/emojiParse");
const CheckOverridesExist = require("./Utils/overrides");

module.exports = async function (msg, args) {
	let emojis = [];
	for (const arg of args) {
		const { emoji, overrides } = CheckOverridesExist(arg);
		const { type, id, error } = await GetEmojiFromInput(emoji);
		if (error) {
			break;
		}
		emojis.push({ type, id, overrides });
	}
	if (emojis.length === 0) return;

	let firstLine = args.slice(emojis.length, args.indexOf("-")).join(" ");
	let secondLine = args.slice(args.indexOf("-") + 1).join(" ");

	let image = await CreateMeme(firstLine, secondLine, emojis);
	msg.channel.send("", { files: [new MessageAttachment(image, "meme.png")] });
};
