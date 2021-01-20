const axios = require("axios");
const moment = require("moment");

const RAIDER_IO_BASE = "https://raider.io/";
const ROUTES = {
	character: "api/v1/characters/profile",
};

const DUNGEONS = [
	{ FullName: "De Other Side", ShortName: "DOS", Times: [40.0, 32.0, 24.0] },
	{
		FullName: "Halls of Atonement",
		ShortName: "HOA",
		Times: [31.0, 24.48, 18.36],
	},
	{
		FullName: "Mists of Tirna Scithe",
		ShortName: "MISTS",
		Times: [30.0, 24.0, 18.0],
	},
	{ FullName: "Plaguefall", ShortName: "PF", Times: [38.0, 30.24, 22.38] },
	{
		FullName: "Sanguine Depths",
		ShortName: "SD",
		Times: [41.0, 32.48, 24.36],
	},
	{
		FullName: "Spires of Ascension",
		ShortName: "SOA",
		Times: [39.0, 31.12, 23.24],
	},
	{
		FullName: "The Necrotic Wake",
		ShortName: "NW",
		Times: [36.0, 28.48, 21.36],
	},
	{
		FullName: "Theater of Pain",
		ShortName: "TOP",
		Times: [37.0, 29.36, 22.12],
	},
];

function millisToMinutesAndSeconds(millis) {
	var minutes = Math.floor(millis / 60000);
	var seconds = ((millis % 60000) / 1000).toFixed(0);
	return parseFloat(minutes + "." + (seconds < 10 ? "0" : "") + seconds);
}

module.exports = {
	name: "keys",
	help: "Gets recently completed keys and whether they were depleted or not.",
	command: async function (msg, args) {
		const [charName, realmName] = args;

		if (!charName || !realmName) {
			return msg.channel.send(
				"Provide a character name and realm name, E.G. keys loathing ragnaros"
			);
		}

		const fullRoute = `${RAIDER_IO_BASE}${ROUTES.character}?region=eu&realm=${realmName}&name=${charName}&fields=mythic_plus_recent_runs`;
		axios
			.get(fullRoute)
			.then((response) => {
				const {
					name: fullName,
					class: fullClass,
					race,
					last_crawled_at,
					mythic_plus_recent_runs,
					profile_url,
				} = response.data;

				const runStrings = [];

				mythic_plus_recent_runs.sort((a, b) => {
					return b.mythic_level - a.mythic_level;
				});

				for (const run of mythic_plus_recent_runs) {
					const dungeon = DUNGEONS.find(
						(d) => d.ShortName === run.short_name
					);
					const time = millisToMinutesAndSeconds(run.clear_time_ms);

					var resultTime = 0;
					for (const medalTime of dungeon.Times) {
						if (time < medalTime) {
							resultTime++;
						}
					}

					const resultString =
						resultTime > 0 ? `${resultTime} chest` : "DEPLETED";
					runStrings.push(
						`\t*${dungeon.FullName}* +${
							run.mythic_level
						} - **${resultString}** - Time (${time}). Completed: ${moment(
							run.completed_at
						).calendar()}`
					);
				}
				msg.channel.send(`
                Results for **${fullName}** the ${race} ${fullClass} (last updated: ${moment(
					last_crawled_at
				).calendar()}):\n**Recent Runs**:\n${runStrings.join("\n")}
                More info at <${profile_url}>`);
			})
			.catch((err) => {
				console.error(err);
			});
	},
};
