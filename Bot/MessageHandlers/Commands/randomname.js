import GetName from "../Generators/Names/Wacky/wackyNameGen";

module.exports = {
	name: "randomname",
	usagePrefix: "[optional_name]",
	help:
		"Gives you back a random name. Pass in a name to get a starting point.",
	command: function (msg, args) {
		msg.channel.send(GetName(args[0]));
	},
};
