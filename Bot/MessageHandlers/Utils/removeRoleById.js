import { GetRoleById } from "../Utils/getRoleById";

export const RemoveRoleById = (guild, target, roleId) => {
    let role = GetRoleById(guild, roleId);
    target.roles.remove(role)
        .catch(console.error);
}