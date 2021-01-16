import { parse } from "twemoji";
import { client } from "../../app";
import UNICODE_EMOJI_REGEX from "./EmojiRegex";

const CUSTOM_EMOJI_REGEX = RegExp("<:(\\w+):(\\w+)>");

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

module.exports = async function (emoji) {
	if (CUSTOM_EMOJI_REGEX.test(emoji)) {
		let exec = CUSTOM_EMOJI_REGEX.exec(emoji);
		let emojiId = exec[2];
		return { type: "custom", id: emojiId };
	} else if (UNICODE_EMOJI_REGEX.test(emoji)) {
		let icon = await RetrieveEmojiFromTwemoji(emoji);
		return { type: "inbuilt", id: icon };
	} else {
		let foundEmoji = client.emojis.cache.find((e) => e.name == emoji);
		if (foundEmoji) {
			return { type: "custom", id: foundEmoji.id };
		}
	}
	return { error: "Failed to find" };
};
