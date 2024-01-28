import { DecrementStrike } from "../MessageHandlers/Strike/decrement";
import { RandomElement } from "../MessageHandlers/Utils/random";
import { AddRoleById } from "../MessageHandlers/Utils/roles";
import { RemoveRoleById } from "../MessageHandlers/Utils/roles";
import { ROLES } from "../MessageHandlers/Constants/guildData";

const cron = require("node-cron");
const UserData = require("../Database/Models/userDataModel");

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

	const randomUserId = RandomElement(willingMemberIds);
	const randomMember = membersCache.get(randomUserId);
	AddRoleById(guild, randomMember, ROLES.LUCKY);

	UserData.find({ user: randomUserId }, async (err, docs) => {
		if (err) return console.error(err);

		if (!docs || docs.length === 0) {
			let newUserData = new UserData({
				user: randomUserId,
				timesLucky: 1,
			});
			newUserData.save().catch((err) => console.log(err));
			return;
		};

		if (docs.length > 1) {
			console.error(`Multiple docs found under user id: ${randomUserId}`);
			return;
		}

		const doc = docs[0];
		doc.timesLucky = (doc.timesLucky === undefined) ? 1 : doc.timesLucky + 1;
		doc.save().catch((err) => console.log(err));
	});
}

module.exports = {
	MidnightCron,
};
