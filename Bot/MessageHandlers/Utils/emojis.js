import { client } from "../../app";
import uEmojiParser from 'universal-emoji-parser'

const CUSTOM_EMOJI_REGEX = RegExp("<:(\\w+):(\\w+)>");

export const RetrieveEmojiFromTwemoji = (arg) => {
	let emojiLink = uEmojiParser.parse(arg);
	let match = emojiLink.match(/src="([^"]*)"/);
	if (match && match[1]) {
		let srcUrl = match[1];

		// Extract the part of the URL before .png and after the last /
		let startIndex = srcUrl.lastIndexOf('/') + 1;
		let endIndex = srcUrl.lastIndexOf('.png');
		if (startIndex !== -1 && endIndex !== -1) {
			let imageName = srcUrl.substring(startIndex, endIndex);
			return imageName;
		}
	}
	return null;
};

export const GetEmojiFromInput = async (emoji) => {
	if (CUSTOM_EMOJI_REGEX.test(emoji)) {
		let exec = CUSTOM_EMOJI_REGEX.exec(emoji);
		let emojiId = exec[2];
		return { type: "custom", id: emojiId };
	} 
	
	let icon = RetrieveEmojiFromTwemoji(emoji);
	if (icon) {
		return { type: "inbuilt", id: icon };
	} else {
		let foundEmoji = client.emojis.cache.find((e) => e.name == emoji);
		if (foundEmoji) {
			return { type: "custom", id: foundEmoji.id };
		}
	}

	return { error: "Failed to find" };
};

const OVERRIDES_REGEX = RegExp("^-?[0-9]+,-?[0-9]+,-?[0-9]+,-?[0-9]+");

export const CheckOverridesExist = (arg) => {
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
};
