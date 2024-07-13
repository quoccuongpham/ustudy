import { get_word } from "./lib/get_word";

export default async function Team() {
	const word = await get_word("request");
	return <div>{word[0].meanings[0].definitions[0].definition}</div>;
}
