import { GetMemberFromMention } from "../Utils/mentions";
import { IncrementStrike } from "../Strike/increment";
import { AdminScope } from "../Middleware/scopes";
import { ROLES } from "../Constants/guildData";

const GuildData = require("../../Database/Models/guildDataModel");

module.exports = {
	name: "strike",
	usagePrefix: "@person",
	examplePrefix: "@lyons",
	help: "Ban someone",
	scopes: [AdminScope],
	command: function (msg, args) {
		const body = args.join(" ");
		const targetMember = GetMemberFromMention(body, msg.channel);
		if (!targetMember) return;

		const guild = msg.guild;
		const guildId = guild.id;

		GuildData.find({ guild: guildId }, async (err, docs) => {
			if (err) return console.error(err);
	
			if (!docs || docs.length === 0) return;
	
			if (docs.length > 1) {
				console.error(`Multiple docs found under guild id: ${guildId}`);
				return;
			}

			const doc = docs[0];
			const roleMap = doc.roles;
			const roleKeys = Object.keys(ROLES)
			
			if (!roleMap || roleMap.size != roleKeys.length) {
				msg.channel.send(`Roles are not correctly configured. Please use the dbstorerole command.`);
				return;
			}

			const roles = {};
			for (const key of roleKeys) {
				roles[key] = roleMap.get(key);
			}

			const message = IncrementStrike(guild, targetMember, roles)
			msg.channel.send(message);
		});
	},
};
