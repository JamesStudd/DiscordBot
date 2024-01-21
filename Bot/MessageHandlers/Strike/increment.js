import { AddRoleById } from "../Utils/roles";
import { RemoveRoleById } from "../Utils/roles";
import { ROLES } from "../Constants/guildData";

export function IncrementStrike(guild, member) {
	let targetId = member.user.id;
	let memberRoles = member.roles.cache;

	if (memberRoles.has(ROLES.LUCKY)) {
		RemoveRoleById(guild, member, ROLES.LUCKY);
		return `<@${targetId}> lucked out this time!`;

	} else if (memberRoles.has(ROLES.BANNED)) {
		return `<@${targetId}> is banned!`;

	} else if (memberRoles.has(ROLES.STRIKETWO)) {
		RemoveRoleById(guild, member, ROLES.STRIKETWO);
		AddRoleById(guild, member, ROLES.BANNED);
		return `<@${targetId}> has been banned!`;

	} else if (memberRoles.has(ROLES.STRIKEONE)) {
		RemoveRoleById(guild, member, ROLES.STRIKEONE);
		AddRoleById(guild, member, ROLES.STRIKETWO);
		return `<@${targetId}> is on their second strike!`;

	} else {
		AddRoleById(guild, member, ROLES.STRIKEONE);
		return `<@${targetId}> is on their first strike!`;
	}
}
