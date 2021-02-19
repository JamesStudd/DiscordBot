const moment = require("moment");
const cron = require("node-cron");
const Reminder = require("./Database/Models/reminderModel");

function timeout(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function ReminderCron(client) {
	SearchAndProcessReminders(client);
	cron.schedule("* * * * *", () => {
		SearchAndProcessReminders(client);
	});
}

function SearchAndProcessReminders(client) {
	Reminder.find({ date: { $lte: moment().toDate() } }, async (err, docs) => {
		if (err) return console.error(err);

		if (!docs || docs.length === 0) return;

		for (const doc of docs) {
			const channel = client.channels.cache.get(doc.channel);
			channel.send(`Reminder for <@${doc.user}>\n${doc.text}`);
			await timeout(500);
		}

		const ids = docs.map((d) => d._id);
		if (ids.length === 0) return;
		Reminder.deleteMany({ _id: ids }, (err) => {
			if (err) {
				console.error(err);
				console.log("Failed to delete docs");
			}
			console.log("Deleted old reminders.");
		});
	});
}

module.exports = {
	ReminderCron,
};
