const Reminder = require("../../Database/Models/reminderModel");

module.exports = {
	name: "getreminders",
	help: "Get all your reminders.",
	command: function (msg, args) {
		let author = msg.author.id;

		Reminder.find({ author: author })
			.then((docs) => {
				if (docs) {
					let joinedString = docs
						.map((doc) => {
							return `**ID**: \`${doc.ID}\`. **Date**: ${doc.date}. **Message**: ${doc.text}`;
						})
						.join("\n");
					return msg.channel.send(
						`Found ${docs.length} reminders\n${joinedString}`
					);
				}
				msg.channel.send("No reminders found :(");
			})
			.catch((err) => {
				console.log(err);
				msg.channel.send(`Failed to get reminders :(`);
			});
	},
};
