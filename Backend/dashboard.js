import express from "express";
const path = require("path");

const app = express();
const port = 5000;

const FrontEndPath = "./../frontend/build";

// Routes
let commands = require("./Routes/commands");

app.use(express.static(path.join(__dirname, FrontEndPath)));

function SetupDashboard(client) {
	app.get("/", (req, res) => {
		res.sendFile(path.join(__dirname, FrontEndPath, "index.html"));
	});

	app.use("/commands", commands);

	app.listen(port, () => {
		console.log(`Listening on port ${port}.`);
	});
}

module.exports = {
	SetupDashboard,
};
