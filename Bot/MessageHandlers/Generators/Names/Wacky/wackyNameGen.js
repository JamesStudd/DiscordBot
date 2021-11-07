import { Start, Middle, End } from "./options.json";
import { RandomElement } from "../../../Utils/random";

module.exports = function (input) {
	let name;
	if (input) {
		input = input.toLowerCase();
		if (input.length == 1) {
			let possibleNames = Start.filter(
				(word) => word[0].toLowerCase() === input
			);
			name = RandomElement(possibleNames);
		} else {
			let possibleNames = Start.filter(
				(word) => word.toLowerCase().indexOf(input) !== -1
			);
			name = RandomElement(possibleNames);
		}
	}
	if (!name) {
		name = RandomElement(Start);
	}
	let middle =
		Middle.find(
			(word) => word[0].toLowerCase() === name[0].toLowerCase()
		) || RandomElement(Middle);
	let last = RandomElement(End);

	if (Math.random() > 0.5) {
		return `${name} ${middle} ${last}`;
	}
	return `${name} ${middle}${last.toLowerCase()}`;
};
