export const Timeout = (ms) => 
	new Promise((resolve) => setTimeout(resolve, ms));

export const MillisToMinutesAndSeconds = (millis) => {
	var minutes = Math.floor(millis / 60000);
	var seconds = ((millis % 60000) / 1000).toFixed(0);
	return parseFloat(minutes + "." + (seconds < 10 ? "0" : "") + seconds);
};