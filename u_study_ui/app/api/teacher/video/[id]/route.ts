import { NextRequest } from "next/server";

export async function GET(
	req: NextRequest,
	{ params: { id } }: { params: { id: string } }
) {
	try {
		const res = await fetch(`http://localhost:3002/video/${id}`, {
			headers: {
				Authorization: `Bearer ${
					req.cookies.get("access_token")?.value
				}`,
			},
			next: {
				revalidate: 0,
			},
		});
		if (res.ok) {
			let data = await res.json();
			return Response.json(data);
		}
		return Response.error();
	} catch (error) {
		return Response.error();
	}
}
