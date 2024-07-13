import { cookies } from "next/headers";

export async function GET(req: Request) {
	try {
		let cookiesStore = cookies();

		const res = await fetch("http://localhost:3001/courses/teacher", {
			headers: {
				Authorization: `Bearer ${
					cookiesStore.get("access_token")?.value
				}`,
			},
		});
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
