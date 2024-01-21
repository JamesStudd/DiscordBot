import { AddRoleById } from "../Utils/roles";
import { RemoveRoleById } from "../Utils/roles";
import { ROLES } from "../Constants/guildData";

export function DecrementStrike(guild, member) {
	let targetId = member.user.id;
	let memberRoles = member.roles.cache;

	if (memberRoles.has(ROLES.BANNED)) {
		RemoveRoleById(guild, member, ROLES.BANNED);
		AddRoleById(guild, member, ROLES.STRIKETWO);
		return `<@${targetId}> has been un-banned!`;

	} else if (memberRoles.has(ROLES.STRIKETWO)) {
		RemoveRoleById(guild, member, ROLES.STRIKETWO);
		AddRoleById(guild, member, ROLES.STRIKEONE);
		return `<@${targetId}> is on their first strike!`;

	} else if (memberRoles.has(ROLES.STRIKEONE)) {
		RemoveRoleById(guild, member, ROLES.STRIKEONE);
		return `<@${targetId}> is strike free!`;
	}
}
