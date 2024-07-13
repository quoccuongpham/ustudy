import { NextRequest } from "next/server";

export async function GET(
	req: NextRequest,
	{ params: { id } }: { params: { id: string } }
) {
	try {
		const res = await fetch(
			`http://localhost:3001/chart/enrollment/${id}`,
			{
				headers: {
					Authorization: `Bearer ${
						req.cookies.get("access_token")?.value
					}`,
				},
			}
		);
		if (!res.ok) {
			return Response.json({
				error: true,
			});
		}
		const data = await res.json();
		return Response.json(data);
	} catch (error) {
		return Response.json({
			error: true,
		});
	}
}
