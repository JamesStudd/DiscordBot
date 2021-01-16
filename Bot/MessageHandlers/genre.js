import { GetRandomGenre } from "./Spotify/everyNoiseGenre";

function CapitalizeFirstLetters(sentence) {
	return sentence.replace(/(^\w{1})|(\s{1}\w{1})/g, (match) =>
		match.toUpperCase()
	);
}

module.exports = function (msg, args) {
	const { genreName, link } = GetRandomGenre(args[0]);
	let capitalized = CapitalizeFirstLetters(genreName);
	msg.channel.send(`Why not try **${capitalized}**? -- ${link}`);
};
