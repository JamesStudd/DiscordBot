export const GetMemberFromMention = (mention, channel) => {
	if (mention.startsWith("<@") && mention.endsWith(">")) {
		mention = mention.slice(2, -1);

		if (mention.startsWith("!")) {
            mention = mention.slice(1);
			const foundMember = channel.members.find(
                (member) => member.user.id === mention
            );
            return foundMember;
		}

        return undefined;
	}
}