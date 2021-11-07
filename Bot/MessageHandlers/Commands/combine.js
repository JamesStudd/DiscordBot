import { CreateCombinedImage } from "../Generators/Images/imageCreators";
import { MessageAttachment } from "discord.js";
import { GetEmojiFromInput } from "../Utils/emojis";
import { CheckOverridesExist } from "../Utils/emojis";

module.exports = {
	name: "combine",
	usagePrefix: "emoji(x,y,width,height)",
	examplePrefix: ":joy:(0,0,32,32) :x:",
	help:
		"Creates an image combining X emojis together (can pass in any amount). Must use the actual emoji rather than the name. Optionally add paranthesis after the emoji to override x,y,width,height. Image size is 128, 128, and the top left of the image is 0,0.",
	command: async function (msg, args) {
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
	},
};
