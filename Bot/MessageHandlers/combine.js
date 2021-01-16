import { CreateCombinedImage } from "./Generators/Images/imageCreators";
import { MessageAttachment } from "discord.js";

const GetEmojiFromInput = require("./Utils/emojiParse");
const CheckOverridesExist = require("./Utils/overrides");

module.exports = async function (msg, args) {
	let emojis = [];
	for (const arg of args) {
		const { emoji, overrides } = CheckOverridesExist(arg);
		const { type, id, error } = await GetEmojiFromInput(emoji);
		if (error) {
			console.log(`Failed to find an emoji for ${emoji}`);
			continue;
		}
		emojis.push({ type, id, overrides });
	}
	let image = await CreateCombinedImage(emojis);
	msg.channel.send("", {
		files: [new MessageAttachment(image, "combined.png")],
	});
};
