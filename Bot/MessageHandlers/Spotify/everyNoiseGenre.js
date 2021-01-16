const data = require("./cached.json");
import { RandomElement } from "../Utils/randomElement";

export function GetRandomGenre(input) {
	let foundGenre;
	if (input) {
		let possibleGenres = data.filter(
			(genre) =>
				genre.genreName.toLowerCase().indexOf(input.toLowerCase()) != -1
		);
		foundGenre = RandomElement(possibleGenres);
	}

	if (!foundGenre) {
		foundGenre = RandomElement(data);
	}

	return foundGenre;
}
