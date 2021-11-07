export const CapitalizeFirstLetters = (sentence) => {
	return sentence.replace(/(^\w{1})|(\s{1}\w{1})/g, (match) =>
		match.toUpperCase()
	);
};