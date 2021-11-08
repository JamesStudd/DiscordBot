export const CapitalizeFirstLetters = (sentence) => {
	return sentence.replace(/(^\w{1})|(\s{1}\w{1})/g, (match) =>
		match.toUpperCase()
	);
};

export const IsNumeric = (str) => {
    if (typeof str != "string") return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
};