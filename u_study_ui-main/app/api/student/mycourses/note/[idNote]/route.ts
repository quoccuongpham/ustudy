import { cookies } from "next/headers";
import { CreateNoteData } from "../video/[idVideo]/route";

export async function PATCH(
	request: Request,
	{
		params,
	}: {
		params: {
			idNote: string;
		};
	}
) {
	try {
		const cookieStore = cookies();
		const accessToken = cookieStore.get("access_token");
		if (!accessToken) {
			throw new Error("access token is null");
		}

		const body: CreateNoteData = await request.json();
		const res = await fetch(
			`http://localhost:3001/notes/${params.idNote}`,
			{
				method: "PATCH",
				headers: {
					Accept: "*/*",
					"User-Agent":
						"Thunder Client (https://www.thunderclient.com)",
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken.value}`,
				},
				body: JSON.stringify(body),
			}
		);
		if (res.ok) {
			const note = await res.json();
			return Response.json(note);
		}
		return Response.error();
	} catch (error) {
		return Response.error();
	}
}
