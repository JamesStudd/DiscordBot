import { AdminScope } from "../Middleware/scopes";
import { ROLES } from "../Constants/guildData";

const GuildData = require("../../Database/Models/guildDataModel");

function RoleExists(roles, roleId) {
    let roleFound = false;
    roles.forEach(role => {
        if (role.id == roleId) {
            roleFound = true;
            return;
        }
    });
    return roleFound;
}

function StoreRoleInDb(guildId, roleId, roleTag, channel) {
    GuildData.find({ guild: guildId }, async (err, docs) => {
        if (err) return console.error(err);

        if (!docs || docs.length === 0) {
            const roleMap = new Map();
            roleMap.set(roleTag, roleId);

            let newGuildData = new GuildData({
                guild: guildId,
                roles: roleMap,
            });
            newGuildData.save().catch((err) => console.log(err));
            return;
        };

        if (docs.length > 1) {
            console.error(`Multiple docs found under guild id: ${guildId}`);
            return;
        }

        const doc = docs[0];
        const roleMap = doc.roles;
        roleMap.set(roleTag, roleId);
        doc.save()
            .then(channel.send(`Role ${roleId} assigned as ${roleTag}.`))
            .catch((err) => console.log(err));
    });
}

module.exports = {
    name: "dbstorerole",
    usagePrefix: "[role id] [role tag]",
    examplePrefix: "902322660262957056 LUCKY",
    help: "Assign a role ID to one of the predefined role tags",
    scopes: [AdminScope],
    command: function (msg, args) {
        if (args.length < 2) return;

        const roleId = args[0];
        const roleTag = args[1];

        const keys = Object.keys(ROLES);
        const key = keys.find((key) => key.includes(roleTag));
        if (key == undefined) {
            msg.channel.send(`Invalid role tag, accepted tags: ${keys}`);
            return;
        }

        const guild = msg.channel.guild;
        guild.roles.fetch()
            .then(roles => {
                if (!RoleExists(roles.cache, roleId)) {
                    msg.channel.send(`Invalid role id.`);
                    return;
                }
                StoreRoleInDb(guild.id, roleId, roleTag, msg.channel);
            })
            .catch(err => console.log(err));
    },
};
