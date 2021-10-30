import { RandomElement } from "./randomElement";

const possibleAnswers = [
	// POSITIVE = 10
	"It is certain.",
	"It is decidedly so.",
	"Without a doubt.",
	"Yes definitely.",
	"You may rely on it.",
	"As I see it, yes.",
	"Most likely.",
	"Outlook good.",
	"Yes.",
	"Signs point to yes.",

	// NEGATIVE = 9
	"Don't count on it.",
	"My reply is no.",
	"My sources say no.",
	"Outlook not so good.",
	"Very doubtful.",
	"Absolutely not.",
	"Signs point to no.",
	"100% no.",
	"No.",
];

export const RandomAnswer = () => RandomElement(possibleAnswers);
