import { cookies } from "next/headers";
// import { server_host } from "../utils/constant";

export type MyCourse = {
	uuid: string;
	courseId: number;
	cancelled: boolean;
	cencelledReason?: string;
	createdAt: string;
	updatedAt: string;
	course: {
		id: number;
		uuid: string;
		categoryId: number;
		title: string;
		description: string;
		image: string;
		price: number;
		createdAt: string;
		updateAt: string;
		user: {
			name: string;
		};
	};
};

export default async function getMyCourse(): Promise<MyCourse[] | undefined> {
	try {
		const res = await fetch(`http://localhost:3001/courses/user`, {
			method: "GET",
			headers: {
				Accept: "*/*",
				"User-Agent": "Thunder Client (https://www.thunderclient.com)",
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("access_token")}`,
			},
			credentials: "include",
		});
		if (!res.ok) {
			throw new Error("Faild to fetch your courses");
		}

		return res.json();
	} catch (error) {}
}
