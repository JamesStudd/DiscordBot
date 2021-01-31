import { createCanvas, loadImage, registerFont } from "canvas";
const path = require("path");

const BASE_EMOJI_URL = "https://cdn.discordapp.com/emojis/";
const BASE_TWEMOJI = "https://twemoji.maxcdn.com/v/latest/";
const TWEMOJI_SIZE = "72x72/";
const FILE_EXTENSION = ".png";

let runescapeSkillsBase;
let runescapeBasePositions = {
	top: [90, 40],
	bottom: [120, 70],
};

registerFont(path.join(__dirname, "Runescape", "RuneScape-Chat-07.ttf"), {
	family: "Runescape",
});

(async () => {
	runescapeSkillsBase = await loadImage(
		path.join(__dirname, "Runescape", "Blank.png")
	);
})();

export async function CreateRunescapeSkills(runescapeSkills) {
	const width = 503;
	const height = 681;
	const canvas = createCanvas(width, height);
	const context = canvas.getContext("2d");

	context.drawImage(runescapeSkillsBase, 0, 0);

	context.fillStyle = "yellow";
	context.font = '32px "Runescape"';

	let currOffsetDown = 0;
	let currOffsetAcross = 0;

	let offsetDown = 85;
	let offsetAcross = 168;

	context.fillText(runescapeSkills.skills.TotalLevel.level, 390, 665);

	Object.keys(runescapeSkills.skills).forEach((skill, i) => {
		if (i === 0) return;

		let level = runescapeSkills.skills[skill].level;
		let { top, bottom } = runescapeBasePositions;

		let xTop = top[0] + currOffsetAcross;
		let yTop = top[1] + currOffsetDown;

		context.fillText(level, xTop, yTop);

		let xBot = bottom[0] + currOffsetAcross;
		let yBot = bottom[1] + currOffsetDown;

		context.fillText(level, xBot, yBot);

		currOffsetDown += offsetDown;
		if (i != 0 && i % 8 === 0) {
			currOffsetAcross += offsetAcross;
			currOffsetDown = 0;
		}
	});

	return canvas.toBuffer("image/png");
}

export async function CreateCombinedImage(emojis) {
	const size = 128;
	const canvas = createCanvas(size, size);
	const context = canvas.getContext("2d");

	await DrawEmojis(emojis, size, context);
	return canvas.toBuffer("image/png");
}

export async function CreateMeme(topText, bottomText, emojis) {
	const size = 256;
	const canvas = createCanvas(size, size);
	const context = canvas.getContext("2d");

	await DrawEmojis(emojis, size, context);

	context.fillStyle = "white";
	context.strokeStyle = "black";

	context.font = "30px Impact";

	let lines = FitText(topText, context, size);

	lines.forEach((line, i) => {
		let width = context.measureText(line).width;
		let xPos = size / 2 - width / 2;
		context.fillText(line, xPos, (i + 1) * 30);
		context.strokeText(line, xPos, (i + 1) * 30);
	});

	lines = FitText(bottomText, context, size);

	lines.forEach((line, i) => {
		let width = context.measureText(line).width;
		let xPos = size / 2 - width / 2;
		context.fillText(line, xPos, 240 - (lines.length - 1 - i) * 30);
		context.strokeText(line, xPos, 240 - (lines.length - 1 - i) * 30);
	});

	return canvas.toBuffer("image/png");
}

async function DrawEmojis(emojis, size, context) {
	for (const emoji of emojis) {
		const x = emoji.overrides ? emoji.overrides[0] : 0;
		const y = emoji.overrides ? emoji.overrides[1] : 0;
		const width = emoji.overrides ? emoji.overrides[2] : size;
		const height = emoji.overrides ? emoji.overrides[3] : size;
		if (emoji.type == "custom") {
			const img = await loadImage(
				`${BASE_EMOJI_URL}${emoji.id}${FILE_EXTENSION}`
			);
			context.drawImage(img, x, y, width, height);
		} else if (emoji.type == "inbuilt") {
			const img = await loadImage(
				`${BASE_TWEMOJI}${TWEMOJI_SIZE}${emoji.id}${FILE_EXTENSION}`
			);
			context.drawImage(img, x, y, width, height);
		}
	}
}

function FitText(text, context, size) {
	let width = context.measureText(text).width;
	if (width > size) {
		let lines = [];
		let parts = text.split(" ");
		let line = parts[0];

		parts.forEach((part, i) => {
			if (i === 0) return;
			let lineWidth = context.measureText(line).width;
			let partWidth = context.measureText(`${part} `).width;

			if (i === parts.length - 1) {
				if (lineWidth + partWidth > size) {
					lines.push(line);
					lines.push(part);
				} else {
					lines.push(`${line} ${part}`);
				}
			} else if (lineWidth + partWidth > size) {
				lines.push(line);
				line = part;
			} else {
				line += ` ${part}`;
			}
		});
		return lines;
	} else {
		return [text];
	}
}
