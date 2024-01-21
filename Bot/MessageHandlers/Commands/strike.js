import { GetMemberFromMention } from "../Utils/mentions";
import { IncrementStrike } from "../Strike/increment";
import { AdminScope } from "../Middleware/scopes";

module.exports = {
	name: "strike",
	usagePrefix: "@person",
	examplePrefix: "@lyons",
	help: "Ban someone",
	scopes: [AdminScope],
	command: function (msg, args) {
		const body = args.join(" ");
		const targetMember = GetMemberFromMention(body, msg.channel);
		if (!targetMember) return;

		const message = IncrementStrike(msg.guild, targetMember)
		msg.channel.send(message);
	},
};
