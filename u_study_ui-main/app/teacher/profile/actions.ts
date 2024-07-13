"use server";

import { cookies } from "next/headers";
import Swal from "sweetalert2";

export async function withdraw(prev: any, formData: FormData) {
	const cookiesStore = cookies();
	const data: { [key: string]: string } = {};
	const formDataEntries = formData.entries();
	let currentEntry = formDataEntries.next();
	while (!currentEntry.done) {
		const [key, value] = currentEntry.value;
		if (typeof value === "string") {
			data[key] = value;
		}
		currentEntry = formDataEntries.next();
	}

	try {
		const res = await fetch("http://localhost:3001/transaction/withdraw", {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${
					cookiesStore.get("access_token")?.value
				}`,
			},
			method: "POST",
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			// error
		}
		const resData = await res.json();
		return resData;
	} catch (error) {
		console.error("Error when withdrawing", error);
		throw new Error("Error when withdrawing");
	}
}
