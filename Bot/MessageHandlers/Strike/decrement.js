import { AddRoleById } from "../Utils/roles";
import { RemoveRoleById } from "../Utils/roles";

export function DecrementStrike(guild, member, roleIds) {
	let targetId = member.user.id;
	let memberRoles = member.roles.cache;

	if (memberRoles.has(roleIds.STRIKE3)) {
		RemoveRoleById(guild, member, roleIds.STRIKE3);
		AddRoleById(guild, member, roleIds.STRIKE2);
		return `<@${targetId}> has been un-banned!`;

	} else if (memberRoles.has(roleIds.STRIKE2)) {
		RemoveRoleById(guild, member, roleIds.STRIKE2);
		AddRoleById(guild, member, roleIds.STRIKE1);
		return `<@${targetId}> is on their first strike!`;

	} else if (memberRoles.has(roleIds.STRIKE1)) {
		RemoveRoleById(guild, member, roleIds.STRIKE1);
		return `<@${targetId}> is strike free!`;
	}
}
