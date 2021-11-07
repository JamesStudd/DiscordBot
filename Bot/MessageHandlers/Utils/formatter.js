const { MessageEmbed } = require("discord.js");

const ResultCutoff = 5;

export function CreateNetflixEmbed(data) {
	let { title, results, url } = data;

	if (results.length == 0) {
		return "No results found! :(";
	}

	const description =
		results.length > ResultCutoff
			? `Showing available countries for ${ResultCutoff} of them...`
			: `Showing available countries for all of them...`;

	results = results.slice(0, ResultCutoff);

	const exampleEmbed = new MessageEmbed()
		.setColor("#008000")
		.setTitle(title)
		.setURL(url)
		.setDescription(description);

	results.forEach((result) => {
		let title = `${result.title} (${result.type} - ${result.year})`;
		let countries = result.countries.join(", ");
		exampleEmbed.addField(title, countries, false);
	});

	return exampleEmbed;
}
