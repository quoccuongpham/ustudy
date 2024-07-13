import { server_host } from "../utils/constant";
export default async function updateCourse(
	data: {
		title: string;
		description: string;
		price: string;
	},
	id: number
) {
	try {
		const res = await fetch(`${server_host}/courses/${id}`, {
			method: "PATCH",
			headers: {
				Accept: "*/*",
				"User-Agent": "Thunder Client (https://www.thunderclient.com)",
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("access_token")}`,
			},
			credentials: "include",
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			throw new Error();
		}
		return res.json();
	} catch (error) {
		console.log(error);
	}
}
