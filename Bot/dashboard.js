const express = require("express");
const app = express();
const port = 5000;

module.exports = function (client) {
	app.get("/", (req, res) => {
		res.send("Hello World");
	});

	app.listen(port, () => {
		console.log(`Listening on port ${port}.`);
	});
};
