import GetName from "./Generators/Names/Wacky/wackyNameGen";

module.exports = function (msg, args) {
	msg.channel.send(GetName(args[0]));
};
