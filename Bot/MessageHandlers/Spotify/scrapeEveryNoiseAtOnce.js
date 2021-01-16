const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

async function fetch(url) {
	const { data } = await axios.get(url);
	return cheerio.load(data);
}

(async () => {
	const $ = await fetch("http://everynoise.com/everynoise1d.cgi?scope=all");
	let genres = [];

	$("table > tbody > tr").each((index, value) => {
		const data = $(value);
		const children = data.children();
		if (children.length > 2) {
			const genreName = $(children[2]).text();
			const link = $(children[1]).find("a").attr("href");

			if (genreName && link) {
				genres.push({ genreName, link });
			}
		}
	});

	console.log("Writing genres to file");
	fs.writeFileSync(
		path.join(__dirname, "cached.json"),
		JSON.stringify(genres)
	);
})();
