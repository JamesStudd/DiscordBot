import { Start, Middle, End } from "./options.json";
import { Utils } from "./../Utils/Utils";

export function GetName() {
	let name = Utils.RandomElement(Start);
	let middle =
		Middle.find(
			(word) => word[0].toLowerCase() === name[0].toLowerCase()
		) || Utils.RandomElement(Middle);
	let last = Utils.RandomElement(End);

	if (Math.random() > 0.5) {
		return `${name} ${middle} ${last}`;
	}
	return `${name} ${middle}${last.toLowerCase()}`;
}
