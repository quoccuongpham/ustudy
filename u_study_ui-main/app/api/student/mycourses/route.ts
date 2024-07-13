import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const res = await fetch(`http://localhost:3001/courses/user`, {
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
			const data = await res.json();
			return Response.json(data);
		}
		return Response.error();
	} catch (error) {
		console.log(error);

		return Response.json("error");
	}
}
