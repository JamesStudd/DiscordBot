import GetName from "../Generators/Names/Wacky/wackyNameGen";

module.exports = {
	name: "randomname",
	help: "Gives you back a random name.",
	command: function (msg, args) {
		msg.channel.send(GetName(args[0]));
	},
};
