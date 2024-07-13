import { cookies } from "next/headers";

export type CreateNoteData = {
	content: string;
	time: number;
	title: string;
	videoId: number;
	courseId: number;
};
export async function GET(
	request: Request,
	{
		params,
	}: {
		params: {
			idVideo: string;
		};
	}
) {
	try {
		let cookiesStore = cookies();
		type DataRes = {
			found: boolean;
			note?: {
				id: number;
				title: string;
				content: string;
				folderId: number;
				uuid: string;
				videoId: number;
				createdAt: string;
				updatedAt: string;
			};
		};
		const res = await fetch(
			`http://localhost:3001/notes/video/${params.idVideo}`,
			{
				headers: {
					Accept: "*/*",
					"User-Agent":
						"Thunder Client (https://www.thunderclient.com)",
					Authorization: `Bearer ${
						cookiesStore.get("access_token")?.value
					}`,
					"Content-Type": "application/json",
				},
				next: {
					revalidate: 0,
				},
			}
		);
		if (res.ok) {
			const notes: DataRes = await res.json();
			return Response.json(notes);
		}
		return Response.error();
	} catch (error) {
		return Response.json({ error: true });
	}
}

export async function POST(
	request: Request,
	{
		params,
	}: {
		params: {
			idVideo: string;
		};
	}
) {
	try {
		const cookieStore = cookies();
		const body: CreateNoteData = await request.json();

		if (!cookieStore) {
			throw new Error("Cookie store is null");
		}

		const accessToken = cookieStore.get("access_token");

		if (!accessToken) {
			throw new Error("access token is null");
		}

		const res = await fetch(`http://localhost:3001/notes`, {
			method: "POST",
			headers: {
				Accept: "*/*",
				"User-Agent": "Thunder Client (https://www.thunderclient.com)",
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken.value}`,
			},
			body: JSON.stringify(body),
		});
		if (res.ok) {
			const note = await res.json();
			return Response.json(note);
		}
		return Response.error();
	} catch (error) {
		console.error(error);
		return Response.error();
	}
}

export async function DELETE(
	request: Request,
	{
		params,
	}: {
		params: {
			idVideo: string;
		};
	}
) {
	try {
		const cookieStore = cookies();
		const accessToken = cookieStore.get("access_token");
		if (!accessToken) {
			throw new Error("access token is null");
		}

		const res = await fetch(
			`http://localhost:3001/notes/${params.idVideo}`,
			{
				method: "DELETE",
				headers: {
					Accept: "*/*",
					"User-Agent":
						"Thunder Client (https://www.thunderclient.com)",
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken.value}`,
				},
			}
		);
		if (res.ok) {
			const note = await res.json();
			return Response.json(note);
		}
		return Response.error();
	} catch (error) {
		console.error(error);
		return Response.error();
	}
}
