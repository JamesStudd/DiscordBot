const express = require("express");
const app = express();
const port = 5000;

module.exports = function (client) {
	app.get("/", (req, res) => {
		res.send("Hello World");
		console.log(client);
		client.emojis.cache.forEach((emoji) => {
			console.log(emoji);
		});
	});

	app.listen(port, () => {
		console.log(`Listening on port ${port}.`);
	});
};
