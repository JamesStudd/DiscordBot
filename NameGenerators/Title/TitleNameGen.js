const options = require("./options.json");
const Utils = require("./../Utils/Utils").Utils;

const GetName = () => {
	let name = Utils.RandomElement(options.First);
	let last = Utils.RandomElement(options.Last);
	return `${name} The ${last}`;
};

exports.GetName = GetName;
