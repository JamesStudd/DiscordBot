import { createCanvas, loadImage } from "canvas";

const BASE_EMOJI_URL = "https://cdn.discordapp.com/emojis/";
const BASE_TWEMOJI = "https://twemoji.maxcdn.com/v/13.0.1/";
const TWEMOJI_SIZE = "72x72/";
const FILE_EXTENSION = ".png";

export async function CreateCombinedImage(emojis) {
	const size = 128;
	const canvas = createCanvas(size, size);
	const context = canvas.getContext("2d");

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
	return canvas.toBuffer("image/png");
}

export async function CreateMeme(topText, bottomText, emoji) {
	const size = 256;
	const canvas = createCanvas(size, size);
	const context = canvas.getContext("2d");

	if (emoji.type == "custom") {
		const img = await loadImage(
			`${BASE_EMOJI_URL}${emoji.id}${FILE_EXTENSION}`
		);
		context.drawImage(img, 0, 0, size, size);
	} else if (emoji.type == "inbuilt") {
		const img = await loadImage(
			`${BASE_TWEMOJI}${TWEMOJI_SIZE}${emoji.id}${FILE_EXTENSION}`
		);
		context.drawImage(img, 0, 0, size, size);
	}

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
