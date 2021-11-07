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

		let data = {
			guild: msg.guild,
			channel: msg.channel,
			target: targetMember,
			targetId: targetMember.user.id,
			roleToAdd: undefined,
			roleToRemove: undefined,
			message: undefined,
		};

		if (memberRoles.has(ROLES.LUCKY)) {
			data.roleToRemove = ROLES.LUCKY;
			data.message = `lucked out this time!`;

		} else if (memberRoles.has(ROLES.BANNED)) {
			data.message = `is banned!`;

		} else if (memberRoles.has(ROLES.STRIKETWO)) {
			data.roleToAdd = ROLES.BANNED;
			data.roleToRemove = ROLES.STRIKETWO;
			data.message = `has been banned!`;

		} else if (memberRoles.has(ROLES.STRIKEONE)) {
			data.roleToAdd = ROLES.STRIKETWO;
			data.roleToRemove = ROLES.STRIKEONE;
			data.message = `is on their second strike!`;

		} else {
			data.roleToAdd = ROLES.STRIKEONE;
			data.message = `is on their first strike!`;
		}

		handleData(data)
	},
};

function handleData(d) {
	if (d.roleToRemove)
		RemoveRoleById(d.guild, d.target, d.roleToRemove);

	if (d.roleToAdd)
		AddRoleById(d.guild, d.target, d.roleToAdd);

	if (d.message)
		d.channel.send(`<@${d.targetId}> ${d.message}`);
};