require("dotenv").config();
import { Client } from "discord.js";
import { ProcessMessage } from "./messageHandler";
import { ReminderCron } from "./Cron/reminderCron";
import { MidnightCron } from "./Cron/midnightCron";

export const client = new Client();

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setStatus("available");
	client.user.setActivity("?help for commands");

	// Setup crons
	ReminderCron(client);
	MidnightCron(client);

	// Setup dashbaord
	//SetupDashboard(client);
});

client.on("message", (msg) => {
	ProcessMessage(msg);
});

client.login(
	process.env.NODE_ENV === "production"
		? process.env.DISCORD_TOKEN
		: process.env.DISCORD_TOKEN_DEV
);
