import { RandomAnswer } from "../Utils/randomAnswer";

module.exports = {
	name: "8ball",
	help: "Gives you an answer to any question.",
	command: async function (msg, args) {
		msg.channel.send(`${RandomAnswer()}`);
	},
};
