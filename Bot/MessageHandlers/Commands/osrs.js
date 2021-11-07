// TODO: Move to utils

const axios = require("axios");
import { CreateRunescapeSkills } from "../Generators/Images/imageCreators";
import { MessageAttachment } from "discord.js";
import { order } from "./../Settings/runescape";

const BASE_URL =
	"https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=";

class RunescapeStats {
	constructor(arr) {
		this.skills = {
			TotalLevel: {},
			Attack: {},
			Strength: {},
			Defence: {},
			Ranged: {},
			Prayer: {},
			Magic: {},
			Runecrafting: {},
			Construction: {},
			Hitpoints: {},
			Agility: {},
			Herblore: {},
			Thieving: {},
			Crafting: {},
			Fletching: {},
			Slayer: {},
			Hunter: {},
			Mining: {},
			Smithing: {},
			Fishing: {},
			Cooking: {},
			Firemaking: {},
			Woodcutting: {},
			Farming: {},
		};

		let totalLevel = 0;
		for (let i = 0; i < order.length; i++) {
			const element = order[i];
			let [hiscorePos, level, xp] = arr[i].split(",").map((x) => +x);
			// Little hacky but /shrug
			if (element === "Hitpoints" && level === 1) {
				level = 10;
			}
			// Little hacky but /shrug
			if (element !== "TotalLevel") {
				totalLevel += level;
			}
			this.skills[element] = {
				hiscorePos,
				level,
				xp,
			};
		}
		this.skills["TotalLevel"].level = totalLevel;
	}
}

module.exports = {
	name: "osrs",
	usagePrefix: "character_name",
	examplePrefix: "HomidaZero",
	help:
		"Gets runescape hiscores for a passed in name, can pass in with spaces or without.",
	command: async function (msg, args) {
		const charName = args.join(" ");
		axios
			.get(`${BASE_URL}${charName}`)
			.then(async (result) => {
				if (result.data) {
					let arr = result.data.split("\n");
					let image = await CreateRunescapeSkills(
						new RunescapeStats(arr)
					);
					return msg.channel.send("", {
						files: [new MessageAttachment(image, "combined.png")],
					});
				}
			})
			.catch((err) => {
				if (err.response?.status !== 404) {
					console.log(err.response);
				}
				msg.channel.send(`Failed to find data for ${charName}.`);
			});
	},
};
