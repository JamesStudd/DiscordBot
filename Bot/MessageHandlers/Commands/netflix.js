import { GetNetflixResults } from "../Utils/scrape";
import { CreateNetflixEmbed } from "../Utils/formatter";

module.exports = {
	name: "netflix",
	help:
		"Lets you know which country titles are available in on netflix. Usage: `?netflix Iron Man`",
	command: async function (msg, args) {
		let searchTerm = args.join(" ");
		let message = await msg.channel.send(`Searching for... ${searchTerm}`);

		let foundResults = await GetNetflixResults(searchTerm);
		let formatted = CreateNetflixEmbed(foundResults);

		message.edit(formatted);
	},
};
