import { ADMINISTRATOR } from "./../Constants/permissions";

export function AdminScope(user) {
	return user.hasPermission(ADMINISTRATOR);
}
