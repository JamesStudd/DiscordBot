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

module.exports = {
    name: "dbcheckroles",
    help: "Check the assigned role IDs.",
    scopes: [AdminScope],
    command: function (msg, args) {
        const guildId = msg.guild.id;
        GuildData.find({ guild: guildId }, async (err, docs) => {
            if (err) return console.error(err);
    
            if (!docs || docs.length === 0) {
                msg.channel.send(`No roles assigned. Please use the dbstorerole command.`);
                return;
            };
    
            if (docs.length > 1) {
                console.error(`Multiple docs found under guild id: ${guildId}`);
                return;
            }
    
			const doc = docs[0];
			const roleMap = doc.roles;
			const roleKeys = Object.keys(ROLES)

			let message = "";
			for (const key of roleKeys) {
                message += `${key} : ${roleMap.get(key)}\n`;
			}
            
            msg.channel.send(message);
        });
    },
};
