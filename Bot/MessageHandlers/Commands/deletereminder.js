const Reminder = require("../../Database/Models/reminderModel");
const { Settings } = require("./../Settings/bot");

module.exports = {
	name: "deletereminder",
	usagePrefix: "id",
	examplePrefix: "n84ndn19",
	help: `Delete a reminder by passing in the ID. IDs can be found by using "${Settings.prefix}getreminders".`,
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
