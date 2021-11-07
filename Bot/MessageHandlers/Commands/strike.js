const ROLES = {
    LUCKY : "902322660262957056"
    STRIKEONE : "896026304237932565",
    STRIKETWO : "906695092230832139",
    BANNED : "614522888372092928",
}

function getMemberFromMention(mention, channel) {
	if (mention.startsWith("<@") && mention.endsWith(">")) {
		mention = mention.slice(2, -1);

		if (mention.startsWith("!")) {
            mention = mention.slice(1);
			const foundMember = channel.members.find(
                (member) => member.user.id === mention
            );
            return foundMember;
		}

        return undefined;
	}
}

function addRoleById(msg, target, roleId) {
    let role = msg.guild.roles.cache.find(r => r.id === roleId);
    target.roles.add(role)
        .then(() => {
            console.log(`Given ${role} to <@${target.user.id}>`);
        })
        .catch(console.error);
}

function removeRoleById(msg, target, roleId) {
    let role = msg.guild.roles.cache.find(r => r.id === roleId);
    target.roles.remove(role)
        .then(() => {
            console.log(`Given ${role} to <@${target.user.id}>`);
        })
        .catch(console.error);
}

module.exports = {
	name: "strike",
	help: "Strike",
	command: async function (msg, args) {
        let body = args.join(" ");
        let targetMember = getMemberFromMention(body, msg.channel);
        if (!targetMember) {
            msg.channel.send(`Could not find member: ${target}`);
            return;
        }

        let targetId = targetMember.user.id;
        let memberRoles = msg.member.roles.cache;

        if (memberRoles.has(ROLES.LUCKY)) {
            removeRoleById(msg, targetMember, ROLES.LUCKY);
            msg.channel.send(`<@${targetId}> lucked out this time!`);
            return;
        }

        if (memberRoles.has(ROLES.BANNED)) {
            msg.channel.send(`<@${targetId}> is banned!`);
            return;
        }

        if (memberRoles.has(ROLES.STRIKETWO)) {
            removeRoleById(msg, targetMember, ROLES.STRIKETWO);
            addRoleById(msg, targetMember, ROLES.BANNED);
            msg.channel.send(`<@${targetId}> has been banned!`);
            return;
        }

        if (memberRoles.has(ROLES.STRIKEONE)) {
            removeRoleById(msg, targetMember, ROLES.STRIKEONE);
            addRoleById(msg, targetMember, ROLES.STRIKETWO);
            msg.channel.send(`<@${targetId}> is on their second strike!`);
            return;
        }

        addRoleById(msg, targetMember, ROLES.STRIKEONE);
        msg.channel.send(`<@${targetId}> is on their first strike!`);
	},
};
