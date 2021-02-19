const Reminder = require("../../Database/Models/reminderModel");

module.exports = {
	name: "deletereminder",
	help:
		"Delete a reminder by passing in the ID, E.G. `?deleteReminder {id}. IDs can be found by using `?getreminders`.",
	command: function (msg, args) {
		let author = msg.author.id;
		const [targetId, ...rest] = args;

		if (!targetId) {
			return msg.channel.send("Please provide an ID");
		}

		Reminder.deleteOne({ ID: targetId, author: author })
			.then((resp) => {
				const { deletedCount } = resp;
				if (deletedCount) {
					msg.channel.send(
						`Deleted reminder with ID \`${targetId}\``
					);
				} else {
					msg.channel.send(
						`Failed to delete reminder with ID \`${targetId}\` :(`
					);
				}
			})
			.catch((err) => {
				console.log(err);
				msg.channel.send(
					`Failed to delete reminder with ID \`${targetId}\` :(`
				);
			});
	},
};
