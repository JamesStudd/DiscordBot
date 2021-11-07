export const GetRoleById = (msg, roleId) => 
    msg.guild.roles.cache.find(r => r.id === roleId);