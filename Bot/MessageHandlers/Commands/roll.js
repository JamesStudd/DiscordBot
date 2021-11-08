import { IsNumeric } from "../Utils/stringExtensions";
import { RandomInteger } from "../Utils/random";

module.exports = {
	name: "roll",
	usagePrefix: '"x y"',
	examplePrefix: '"2 6"',
	help: "Rolls x number of y-sided dice. Will also roll 1dx if y is unspecified",
	command: function (msg, args) {
        if (!args || !IsNumeric(args[0])) return;
        if (args.length == 1) args.unshift("1");
        else if (!IsNumeric(args[1])) return;

        let min = parseInt(args[0]);
        let max = min * parseInt(args[1]);

        msg.channel.send(`:game_die: ${RandomInteger(min, max)} :game_die:`);
	},
};