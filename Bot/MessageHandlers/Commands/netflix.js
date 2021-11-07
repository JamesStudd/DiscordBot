import { GetNetflixResults } from "../Utils/scrape";
import { CreateNetflixEmbed } from "../Utils/formatter";

module.exports = {
	name: "netflix",
	usagePrefix: "name_of_show",
	examplePrefix: "Rick and Morty",
	help: "Lets you know which country titles are available in on netflix.",
	command: async function (msg, args) {
		let searchTerm = args.join(" ");
		let message = await msg.channel.send(`Searching for... ${searchTerm}`);

		let foundResults = await GetNetflixResults(searchTerm);
		let formatted = CreateNetflixEmbed(foundResults);

		message.edit(formatted);
	},
};
