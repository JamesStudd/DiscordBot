const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const countries = require("i18n-iso-countries");

const BaseNetflixScrapeUrl = "https://unogs.com/search/";

export async function GetNetflixResults(searchTerm) {
	let url = BaseNetflixScrapeUrl + searchTerm;

	let launchOptions = { headless: true };

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
