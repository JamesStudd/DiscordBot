// TODO: Move into a util

import { MillisToMinutesAndSeconds } from "../Utils/millisToMinutesAndSeconds";
import { DUNGEONS } from "../Constants/worldOfWarcraftData";

const axios = require("axios");
const moment = require("moment");

const RAIDER_IO_BASE = "https://raider.io/";
const ROUTES = {
	character: "api/v1/characters/profile",
};

module.exports = {
	name: "keys",
	usagePrefix: "realm_name character_name",
	examplePrefix: "loathing ragnaros",
	help: "Gets recently completed keys and whether they were depleted or not.",
	command: async function (msg, args) {
		const [charName, realmName] = args;

		if (!charName || !realmName) {
			return msg.channel.send(
				"Provide a character name and realm name, E.G. keys loathing ragnaros"
			);
		}

		const fullRoute = `${RAIDER_IO_BASE}${ROUTES.character}?region=eu&realm=${realmName}&name=${charName}&fields=mythic_plus_weekly_highest_level_runs,mythic_plus_scores_by_season:current`;
		axios
			.get(fullRoute)
			.then((response) => {
				const {
					name: fullName,
					class: fullClass,
					race,
					last_crawled_at,
					mythic_plus_weekly_highest_level_runs: runs,
					mythic_plus_scores_by_season: scores,
					profile_url,
				} = response.data;

				const runStrings = [];
				const score = scores[0].scores.all;

				runs.sort((a, b) => {
					return b.mythic_level - a.mythic_level;
				});

				for (const run of runs) {
					const dungeon = DUNGEONS.find(
						(d) => d.ShortName === run.short_name
					);
					const time = MillisToMinutesAndSeconds(run.clear_time_ms);

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
						).format("ddd, hA")}`
					);
				}

				const dungString =
					runStrings.length > 0
						? runStrings.join("\n")
						: "\tNo dungeons this week :( Fletch won't be happy";

				msg.channel.send(`
                Weekly m+ runs for **${fullName}** the ${race} ${fullClass} (last updated: ${moment(
					last_crawled_at
				).format(
					"ddd, hA"
				)}):\n**Score**: ${score}\n**Dungeons**:\n${dungString}
                More info at <${profile_url}>`);
			})
			.catch((err) => {
				msg.channel.send(
					`Unable to find data for *${charName}* on realm *${realmName}* :(`
				);
			});
	},
};
