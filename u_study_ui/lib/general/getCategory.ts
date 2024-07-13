import { server_host } from "../utils/constant";

export default async function getCategory(): Promise<
	{ id: number; description: string }[] | undefined
> {
	try {
		const res = await fetch(`${server_host}/category`);
		if (!res.ok) {
			throw new Error();
		}
		return res.json();
	} catch (error) {
		console.log(error);
	}
}
