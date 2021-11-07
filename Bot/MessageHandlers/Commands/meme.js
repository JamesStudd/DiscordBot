import { CreateMeme } from "../Generators/Images/imageCreators";
import { MessageAttachment } from "discord.js";
import { GetEmojiFromInput } from "../Utils/emojis";
import { CheckOverridesExist } from "../Utils/emojis";

module.exports = {
	name: "meme",
	usagePrefix: ":joy: top text - bottom text",
	examplePrefix: ":joy: this is really - really funny",
	help: "Posts an emoji with text overlay.",
	command: async function (msg, args) {
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
		msg.channel.send("", {
			files: [new MessageAttachment(image, "meme.png")],
		});
	},
};
