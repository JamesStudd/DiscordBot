import { GetRoleById } from "../Utils/getRoleById";

export const RemoveRoleById = (msg, target, roleId) => {
    let role = GetRoleById(msg, roleId);
    target.roles.remove(role)
        .catch(console.error);
}