import { GetRoleById } from "../Utils/getRoleById";

export const AddRoleById = (guild, target, roleId) => {
    let role = GetRoleById(guild, roleId);
    target.roles.add(role)
        .catch(console.error);
}