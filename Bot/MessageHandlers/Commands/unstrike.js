import { GetMemberFromMention } from "../Utils/mentions";
import { DecrementStrike } from "../Strike/decrement";
import { AdminScope } from "../Middleware/scopes";

module.exports = {
	name: "unstrike",
	usagePrefix: "@person",
	examplePrefix: "@lyons",
	help: "Unban someone",
	scopes: [AdminScope],
	command: function (msg, args) {
		const body = args.join(" ");
		const targetMember = GetMemberFromMention(body, msg.channel);
		if (!targetMember) return;

		const message = DecrementStrike(msg.guild, targetMember)
		msg.channel.send(message);
	},
};

