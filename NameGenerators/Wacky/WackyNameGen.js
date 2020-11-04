import { Start, Middle, End } from "./options.json";
import { RandomElement } from "../../Utils/Utils";

export function GetName(input) {
	let name;
	if (input) {
		input = input.toLowerCase();
		if (input.length == 1) {
			name =
				Start.find((word) => word[0].toLowerCase() === input) ||
				RandomElement(Start);
		} else {
			name =
				Start.find(
					(word) => word.toLowerCase().indexOf(input) !== -1
				) || RandomElement(Start);
		}
	} else {
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
}
