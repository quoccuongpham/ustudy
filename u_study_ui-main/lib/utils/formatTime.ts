export default function formatTime(time: string) {
	let timeNum = Number.parseInt(time);
	let hour = Math.floor(timeNum / 3600);
	let minute = Math.floor((timeNum - hour * 3600) / 60);
	let second = timeNum - hour * 3600 - minute * 60;

	return `${hour.toString().padStart(2, "0")}:${minute
		.toString()
		.padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
}
