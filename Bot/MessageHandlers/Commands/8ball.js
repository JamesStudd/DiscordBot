import { RandomAnswer } from "../Utils/random";

module.exports = {
	name: "8ball",
	usagePrefix: "question",
	examplePrefix: "does this bot work",
	help: "Gives you an answer to any question.",
	command: async function (msg, args) {
		msg.channel.send(`:8ball: ${RandomAnswer()} :8ball:`);
	},
};
