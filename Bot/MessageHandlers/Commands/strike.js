import { GetMemberFromMention } from "../Utils/mentions";
import { AddRoleById } from "../Utils/roles";
import { RemoveRoleById } from "../Utils/roles";
import { ROLES } from "../Constants/guildData";

module.exports = {
	name: "strike",
	usagePrefix: "@person",
	examplePrefix: "@lyons",
	help: "Ban someone",
	command: async function (msg, args) {
		const body = args.join(" ");
		const targetMember = GetMemberFromMention(body, msg.channel);
		if (!targetMember) return;

		const memberRoles = targetMember.roles.cache;

		if (memberRoles.has(ROLES.LUCKY)) {
			handleCase(msg, targetMember, 
				undefined, ROLES.LUCKY, 
				"lucked out this time!"
			);

		} else if (memberRoles.has(ROLES.BANNED)) {
			handleCase(msg, targetMember, 
				undefined, undefined, 
				"is banned!"
			);

		} else if (memberRoles.has(ROLES.STRIKETWO)) {
			handleCase(msg, targetMember, 
				ROLES.BANNED, ROLES.STRIKETWO, 
				"has been banned!"
			);

		} else if (memberRoles.has(ROLES.STRIKEONE)) {
			handleCase(msg, targetMember, 
				ROLES.STRIKETWO, ROLES.STRIKEONE, 
				"is on their second strike!"
			);

		} else {
			handleCase(msg,targetMember, 
				ROLES.STRIKEONE, undefined, 
				"is on their first strike!"
			);
		}
	},
};

function handleCase(msg, target, roleToAdd, roleToRemove, message) {
	if (roleToRemove) 
		RemoveRoleById(msg.guild, target, roleToRemove);
	if (roleToAdd) 
		AddRoleById(msg.guild, target, roleToAdd);
	if (message) 
		msg.channel.send(`<@${target.user.id}> ${message}`);
}