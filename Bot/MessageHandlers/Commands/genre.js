import { GetRandomGenre } from "../Spotify/everyNoiseGenre";
import { CapitalizeFirstLetters } from "../Utils/capitalizeFirstLetters";

module.exports = {
	name: "genre",
	usagePrefix: "[optional_genre]",
	examplePrefix: "rock",
	help:
		"Gets a random genre from EveryNoise as well as a Spotify playlist link. Leave arguments empty for a purely random choice or pass in a genre for variations.",
	command: function (msg, args) {
		const { genreName, link } = GetRandomGenre(args[0]);
		let capitalized = CapitalizeFirstLetters(genreName);
		msg.channel.send(`Why not try **${capitalized}**? -- ${link}`);
	},
};
