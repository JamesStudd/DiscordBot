export const GetRoleById = (guild, roleId) =>
    guild.roles.cache.find(r => r.id === roleId);
