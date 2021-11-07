export const GetRoleById = (guild, roleId) =>
    guild.roles.cache.find(r => r.id === roleId);

export const AddRoleById = (guild, target, roleId) => {
    let role = GetRoleById(guild, roleId);
    target.roles.add(role)
        .catch(console.error);
};

export const RemoveRoleById = (guild, target, roleId) => {
    let role = GetRoleById(guild, roleId);
    target.roles.remove(role)
        .catch(console.error);
};