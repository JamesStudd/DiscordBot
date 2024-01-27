import { DecrementStrike } from "../MessageHandlers/Strike/decrement";
import { RandomElement } from "../MessageHandlers/Utils/random";
import { AddRoleById } from "../MessageHandlers/Utils/roles";
import { RemoveRoleById } from "../MessageHandlers/Utils/roles";
import { ROLES } from "../MessageHandlers/Constants/guildData";

const cron = require("node-cron");

function MidnightCron(client) {
	cron.schedule("0 0 * * *", () => {
		RunMidnightTasks(client);
	});
}

function RunMidnightTasks(client) {
	// Temporary fix for multiple servers -
	// only looks for HappyFriendTime
	const guildsCache = client.guilds.cache;
	const happyFriendTimeId = '380375603796246528';
	const guild = guildsCache.get(happyFriendTimeId);
	if (guild == undefined) {
		return;
	}

	let willingMemberIds = [];
	const membersCache = guild.members.cache;
	membersCache.forEach(member => {
		DecrementStrike(guild, member);

		let memberRoles = member.roles.cache;
		if (memberRoles.has(ROLES.LUCKY)) {
			RemoveRoleById(guild, member, ROLES.LUCKY);
		}

		if (memberRoles.has(ROLES.WILLING)) {
			willingMemberIds.push(member.user.id);
		}

		if (memberRoles.has(ROLES.EMPEROR)) {
			willingMemberIds.push(member.user.id);
			willingMemberIds.push(member.user.id);
		}
	});

	const randomMember = membersCache.get(RandomElement(willingMemberIds));
	AddRoleById(guild, randomMember, ROLES.LUCKY);
}

module.exports = {
	MidnightCron,
};
