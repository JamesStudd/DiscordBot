const mongoose = require("../database");

let GuildData = undefined;
if (
	(mongoose.connection && mongoose.connection.readyState == 1) ||
	mongoose.connection.readyState == 2
) {
	let guildSchema = mongoose.Schema({
		guild: {
			type: String,
			required: true,
		},
        roles: {
			type: Map,
			of: String,
			required: false,
		},
	});

	GuildData = mongoose.model("Guild", guildSchema);
}

module.exports = GuildData;
