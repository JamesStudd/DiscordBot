import { First, Last } from "./options.json";
import { RandomElement } from "./../Utils/Utils";

export function GetName() {
	let name = RandomElement(First);
	let last = RandomElement(Last);
	return `${name} The ${last}`;
}
