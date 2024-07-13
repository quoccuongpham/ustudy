export async function get_word(word: string) {
	await new Promise((resolve) => setTimeout(resolve, 2000));
	const res = await fetch(
		"https://api.dictionaryapi.dev/api/v2/entries/en/hello"
	);
	setTimeout(() => {
		console.log("");
	}, 2000);
	const data = await res.json();
	return data;
}
