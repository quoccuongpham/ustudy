import { server_host } from "../utils/constant";
import { cookies } from "next/headers";
export type ContentCourse = {
	// course?: {
	// 	id: number;
	// 	uuid: string;
	// 	categoryId: number;
	// 	title: string;
	// 	description: string;
	// 	image: string;
	// 	price: number;
	// 	createdAt: string;
	// 	updateAt: string;
	// 	chapters: Chapter[];
	// };
	course?: Course;
};

export default async function getContentCourse(
	id: string
): Promise<ContentCourse | undefined> {
	try {
		let cookiesStore = cookies();

		const res = await fetch(`${server_host}/courses/user/${id}`, {
			method: "GET",
			headers: {
				Accept: "*/*",
				"User-Agent": "Thunder Client (https://www.thunderclient.com)",
				"Content-Type": "application/json",
				Authorization: `Bearer ${
					cookiesStore.get("access_token")?.value
				}`,
			},
			next: {
				revalidate: 0,
			},
			credentials: "include",
		});
		if (!res.ok) {
			return {};
		}
		return res.json();
	} catch (error) {
		console.log(error);
		return {};
	}
}
