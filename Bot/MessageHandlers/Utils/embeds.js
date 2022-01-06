const { GenericHelpMessage } = require("./../Constants/embeds");
const { CreateClone } = require("./../Utils/objectExtensions");
const { Settings } = require("./../Settings/bot");

function ScopesToString(command) {
	return command.scopes.map((e) => e.name).join(", ");
}

export function CreateHelpCommandEmbed(command) {
	var embed = CreateClone(GenericHelpMessage);

	embed.description = `Help for '${command.name}'`;

	let usage = command.usagePrefix ?? "";
	let example = command.examplePrefix ?? "";

	embed.fields.push({
		name: "Scope",
		value: ScopesToString(command),
	});

	embed.fields.push({
		name: "Usage",
		value: `${Settings.prefix}${command.name} ${usage}`,
	});

	embed.fields.push({
		name: "Example",
		value: `${Settings.prefix}${command.name} ${example}`,
	});

	embed.fields.push({
		name: "Help",
		value: command.help,
	});

	return embed;
}
