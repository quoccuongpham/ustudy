import { NextRequest } from "next/server";

export async function GET(
	req: NextRequest,
	{ params: { idCourse } }: { params: { idCourse: string } }
) {
	try {
		const res = await fetch(
			`http://localhost:3001/comment?courseId=${idCourse}`,
			{
				headers: {
					Authorization: `Bearer ${
						req.cookies.get("access_token")?.value
					}`,
				},
				next: {
					revalidate: 0,
				},
			}
		);
		if (res.ok) {
			let data = await res.json();
			return Response.json(data);
		}
		return Response.json(idCourse);
	} catch (error) {
		return Response.error();
	}
}
