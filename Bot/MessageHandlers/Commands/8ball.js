import { RandomElement } from "../Utils/random";
import { EIGHTBALLANSWERS } from "../Constants/collections";

module.exports = {
	name: "8ball",
	usagePrefix: "question",
	examplePrefix: "does this bot work",
	help: "Gives you an answer to any question.",
	command: async function (msg, args) {
		const answer = RandomElement(EIGHTBALLANSWERS);
		msg.channel.send(`:8ball: ${answer} :8ball:`);
	},
};
