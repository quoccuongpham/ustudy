"use server";

import { cookies } from "next/headers";

export async function hidden_video(id: number, value: boolean) {
	const cookiesStore = cookies();
	fetch(`http://localhost:3001/videos/${id}`, {
		method: "PATCH",
		body: JSON.stringify({
			hidden: value,
		}),
		headers: {
			Authorization: `Bearer ${cookiesStore.get("access_token")?.value}`,
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json())
		.then((data) => console.log(data));
}
