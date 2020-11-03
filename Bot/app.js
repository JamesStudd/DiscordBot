require("dotenv").config();
import { Client } from "discord.js";
const client = new Client();
import { ProcessMessage } from "./MessageHandlers";

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setStatus("available");
	client.user.setActivity("?help for commands");
});

client.on("message", (msg) => {
	ProcessMessage(msg);
});

client.login(process.env.DISCORD_TOKEN);
