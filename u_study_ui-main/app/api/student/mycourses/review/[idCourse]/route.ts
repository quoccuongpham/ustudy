import { NextRequest } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: { idCourse: string } }
) {
	try {
		let token = req.cookies.get("access_token")?.value;
		if (!token) {
			return Response.error();
		}
		const res = await fetch(
			`http://localhost:3001/review?courseId=${params.idCourse}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
				next: {
					revalidate: 0,
				},
			}
		);
		if (res.ok) {
			let data = await res.json();
			return Response.json(data);
		} else {
			return Response.error();
		}
	} catch (error) {
		console.log(error);
		return Response.error();
	}
}
