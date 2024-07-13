"use server";
import { CreateNoteData } from "@/app/api/student/mycourses/note/video/[idVideo]/route";
import { cookies } from "next/headers";

export async function createNote(data: CreateNoteData) {
	const cookiesStore = cookies();
	if (!cookiesStore) {
		throw new Error("No cookies found");
	}
	const accessTokenCookie = cookiesStore.get("access_token");
	if (!accessTokenCookie) {
		throw new Error("No access_token cookie found");
	}
	const { value: accessToken } = accessTokenCookie;
	if (!accessToken) {
		throw new Error("access_token cookie is empty");
	}
	const res = await fetch("http://localhost:3001/notes", {
		method: "POST",
		headers: {
			Accept: "*/*",
			"User-Agent": "Thunder Client (https://www.thunderclient.com)",
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(data),
	});
	if (!res.ok) {
		const error = new Error(`${res.status} ${res.statusText}`);
		(error as any).response = res;
		throw error;
	}
}
