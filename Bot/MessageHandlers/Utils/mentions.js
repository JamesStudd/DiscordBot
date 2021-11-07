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
};

export const GetUserFromMention = (mention, channel) => {
    return GetMemberFromMention(mention, channel)?.user;
};

export const GetIdFromMention = (mention, msg) => {
	if (!mention.startsWith("<@") || !mention.endsWith(">")) {
		return;
	}
	
	mention = mention.slice(2, -1);

	let type;

	if (mention.startsWith("!")) {
		type = "user";
		mention = mention.slice(1);
	} else if (mention.startsWith("&")) {
		type = "role";
		mention = mention.slice(1);
	}

	switch (type) {
		case "user":
			const foundUser = msg.channel.members.find(
				(member) => member.user.id === mention
			);
			return foundUser ? foundUser.user.id : undefined;
		case "role":
			const foundRole = msg.channel.guild.roles.cache.find(
				(role) => role.id === mention
			);
			return foundRole ? `&${foundRole.id}` : undefined;
		default:
			return;
	}
};