require("dotenv").config();
import { Client } from "discord.js";
export const client = new Client();
import { ProcessMessage } from "./messageHandler";

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setStatus("available");
	client.user.setActivity("?help for commands");
});

client.on("message", (msg) => {
	ProcessMessage(msg);
});

client.login(
	process.env.NODE_ENV === "production"
		? process.env.DISCORD_TOKEN
		: process.env.DISCORD_TOKEN_DEV
);
