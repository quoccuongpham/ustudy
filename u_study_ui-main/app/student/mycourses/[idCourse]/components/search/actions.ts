"use server";

import { cookies } from "next/headers";

export async function searchSubtitle(prevState: any, formData: FormData) {
	const cookiesStore = cookies();
	const res = await fetch(
		"http://localhost:3001/subtitle?" +
			new URLSearchParams({
				idVideo: formData.get("idVideo") as string,
				search: formData.get("search") as string,
			}),
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${
					cookiesStore.get("access_token")?.value
				}`,
			},
		}
	);
	if (!res.ok) {
		throw new Error();
	}
	const searchData = await res.json();
	return searchData;
}
