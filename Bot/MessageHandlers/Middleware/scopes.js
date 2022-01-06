import { ADMINISTRATOR } from "./../Constants/permissions";

export const Everyone = {
	name: "Everyone",
	conditions: function (user) {
		return true;
	},
};

export const AdminScope = {
	name: "Admin",
	conditions: function (user) {
		return user.hasPermission(ADMINISTRATOR);
	},
};
