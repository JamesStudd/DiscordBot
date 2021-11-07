import { GetRoleById } from "../Utils/getRoleById";

export const AddRoleById = (msg, target, roleId) => {
    let role = GetRoleById(msg, roleId);
    target.roles.add(role)
        .catch(console.error);
}