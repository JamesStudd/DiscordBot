const OVERRIDES_REGEX = RegExp("^-?[0-9]+,-?[0-9]+,-?[0-9]+,-?[0-9]+");

module.exports = function (arg) {
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
