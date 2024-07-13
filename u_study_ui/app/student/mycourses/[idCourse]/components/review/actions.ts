"use server";

import { cookies } from "next/headers";

export type CreateReview = {
	courseId: number;
	rating: number;
	reviewText: string;
};
/**
 *
 * @param formData
 * Create review
 */
export async function create(formData: FormData) {
	const cookiesStore = cookies();

	const rawFormData: CreateReview = {
		rating: +formData.get("rating")!,
		reviewText: formData.get("reviewText")! as string,
		courseId: +formData.get("courseId")!,
	};
	fetch("http://localhost:3001/review", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${cookiesStore.get("access_token")?.value}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(rawFormData),
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			throw new Error();
		})
		.then((data) => console.log(data))
		.catch(() => {
			console.log("error");
		});
}
