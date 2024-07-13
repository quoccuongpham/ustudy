import { NextRequest } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const res = await fetch(`http://localhost:3001/notes/${params.id}`, {
			headers: {
				Authorization: `Bearer ${
					req.cookies.get("access_token")?.value
				}`,
			},
			next: {
				revalidate: 0,
			},
		});
		if (!res.ok) {
			return Response.error();
		}
		const data = await res.json();
		return Response.json(data);
	} catch (error) {
		return Response.error();
	}
}
