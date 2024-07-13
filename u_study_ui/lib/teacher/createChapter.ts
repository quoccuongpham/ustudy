import { server_host } from "../utils/constant";

export type CreateCouseForm = {
	title: string;
	courseId: number;
};

export default async function createChapter(data: CreateCouseForm) {
	try {
		const res = await fetch(`${server_host}/chapters`, {
			method: "POST",
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
