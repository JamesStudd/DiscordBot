import { GetRoleById } from "../Utils/getRoleById";

export const removeRoleById = (msg, target, roleId) => {
    let role = GetRoleById(msg, roleId);
    target.roles.remove(role)
        .catch(console.error);
}