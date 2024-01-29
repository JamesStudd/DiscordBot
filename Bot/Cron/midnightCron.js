import { DecrementStrike } from "../MessageHandlers/Strike/decrement";
import { RandomElement } from "../MessageHandlers/Utils/random";
import { AddRoleById } from "../MessageHandlers/Utils/roles";
import { RemoveRoleById } from "../MessageHandlers/Utils/roles";
import { ROLES } from "../MessageHandlers/Constants/guildData";

const cron = require("node-cron");
const UserData = require("../Database/Models/userDataModel");
const GuildData = require("../Database/Models/guildDataModel");

function MidnightCron(client) {
	cron.schedule("0 0 * * *", () => {
		RunMidnightTasks(client);
	});
}

function RunMidnightTasks(client) {
	const guilds = client.guilds.cache;
	if (!guilds) return;

	guilds.forEach(guild => {
		GuildData.find({ guild: guild.id }, async (err, docs) => {
			if (err) return console.error(err);
	
			if (!docs || docs.length === 0) return;
	
			if (docs.length > 1) {
				console.error(`Multiple docs found under guild id: ${guild.Id}`);
				return;
			}
			
			const doc = docs[0];
			const roleMap = doc.roles;
			const roleKeys = Object.keys(ROLES)
			
			if (!roleMap || roleMap.size != roleKeys.length) return;

			const roleIds = {};
			for (const key of roleKeys) {
				roleIds[key] = roleMap.get(key);
			}

			guild.members.fetch()
				.then(members => ApplyRoleChanges(guild, members, roleIds))
				.catch(err => console.log(err));
		});
	});
}

function ApplyRoleChanges(guild, members, roleIds) {
	let willingMemberIds = [];
	
	members.forEach(member => {
		const memberId = member.user.id;
		const memberRoles = member.roles.cache;

		DecrementStrike(guild, member, roleIds);

		if (memberRoles.has(roleIds.LUCKY)) {
			RemoveRoleById(guild, member, roleIds.LUCKY);
		}

		if (memberRoles.has(roleIds.MEMBER)) {
			willingMemberIds.push(memberId);
		}

		if (memberRoles.has(roleIds.ADMIN)) {
			willingMemberIds.push(memberId);
			willingMemberIds.push(memberId);
		}
	});

	if (!willingMemberIds || willingMemberIds.length == 0) return;

	const randomUserId = RandomElement(willingMemberIds);
	const randomMember = members.get(randomUserId);
	AddRoleById(guild, randomMember, roleIds.LUCKY);

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
