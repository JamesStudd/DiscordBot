const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const countries = require("i18n-iso-countries");
const { MessageEmbed } = require("discord.js");

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

// Might be worth pulling out the meat and making an abstract pie
// for these next two functions
async function GetNetflixResults(searchTerm) {
	let encodedSearchTerm = encodeURIComponent(searchTerm);
	let url = "https://unogs.com/search/" + encodedSearchTerm;

	let launchOptions = { headless: true, args: ["--no-sandbox"] };

	const browser = await puppeteer.launch(launchOptions);
	const page = await browser.newPage();

	// set viewport and user agent (just in case for nice viewing)
	await page.setUserAgent(
		"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
	);

	// go to the target web
	await page.goto(url);

	// get the selector input type=file (for upload file)
	await page.waitForSelector(".searchResults");

	const content = await page.content();

	const $ = cheerio.load(content);

	let resultsFoundText = $(".searchResults")
		.text()
		.split("\n")
		.map((e) => e.trim())
		.filter((e) => e)[0];

	let foundTitles = {
		title: resultsFoundText,
		url,
		results: [],
	};

	$(".titleitem").each((i, searchResult) => {
		let videoDiv = $(searchResult).children()[0];
		let divs = $(videoDiv).children("div");

		let topBar = $(divs[2]);
		let availableCountriesDiv = $(divs[4]);

		let title = topBar.children("b").first().text();
		let metaData = topBar.children("span");
		let type = $(metaData[0]).text();
		let year = $(metaData[1]).text();

		let newResult = {
			title,
			type,
			year,
			countries: [],
		};

		availableCountriesDiv.children("img").each((i, element) => {
			let src = $(element).attr("src");
			let countryWithExtension = src.split("/").pop();
			let countryIsoCode = countryWithExtension.split(".")[0];
			let countryName = countries.getName(countryIsoCode, "en");

			newResult.countries.push(countryName);
		});

		foundTitles.results.push(newResult);
	});

	return foundTitles;
}

function CreateNetflixEmbed(data) {
	let { title, results, url } = data;

	if (results.length == 0) {
		return "No results found! :(";
	}

	const resultCutoff = 5;
	const description =
		results.length > resultCutoff
			? `Showing available countries for ${resultCutoff} of them...`
			: `Showing available countries for all of them...`;

	results = results.slice(0, resultCutoff);

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