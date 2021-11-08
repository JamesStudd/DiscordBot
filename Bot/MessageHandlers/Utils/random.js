export const RandomElement = (arr) =>
	arr[Math.floor(Math.random() * arr.length)];

export const RandomInteger = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min;