import { server_host } from "../utils/constant";

export type CreateCouseForm = {
	[key: string]: any;
	categoryId: number;
	title: string;
	description: string;
	image: string;
	price: number;
};

export default async function createCourse(data: CreateCouseForm) {
	try {
		const res = await fetch(`http://localhost:3001/courses`, {
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
		const courseCreated = await res.json();
		return courseCreated;
	} catch (error) {
		console.log(error);
	}
}
