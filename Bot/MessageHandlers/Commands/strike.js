import { GetMemberFromMention } from "../Utils/getMemberFromMention";
import { AddRoleById } from "../Utils/addRoleById";
import { RemoveRoleById } from "../Utils/removeRoleById";

import { ROLES } from "../Settings/roles";

module.exports = {
    name: "strike",
    help: "Strike :)",
    command: async function (msg, args) {
        let body = args.join(" ");
        let targetMember = GetMemberFromMention(body, msg.channel);
        if (!targetMember)
            return;

        let targetId = targetMember.user.id;
        let memberRoles = targetMember.roles.cache;

        if (memberRoles.has(ROLES.LUCKY)) {
            RemoveRoleById(msg, targetMember, ROLES.LUCKY);
            msg.channel.send(`<@${targetId}> lucked out this time!`);

        } else if (memberRoles.has(ROLES.BANNED)) {
            msg.channel.send(`<@${targetId}> is banned!`);

        } else if (memberRoles.has(ROLES.STRIKETWO)) {
            RemoveRoleById(msg, targetMember, ROLES.STRIKETWO);
            AddRoleById(msg, targetMember, ROLES.BANNED);
            msg.channel.send(`<@${targetId}> has been banned!`);
        }
        else if (memberRoles.has(ROLES.STRIKEONE)) {
            RemoveRoleById(msg, targetMember, ROLES.STRIKEONE);
            AddRoleById(msg, targetMember, ROLES.STRIKETWO);
            msg.channel.send(`<@${targetId}> is on their second strike!`);

        } else {
            AddRoleById(msg, targetMember, ROLES.STRIKEONE);
            msg.channel.send(`<@${targetId}> is on their first strike!`);
        }
    },
};
