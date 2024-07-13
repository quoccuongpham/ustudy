import { NextRequest } from "next/server";

export async function POST(
	req: NextRequest,
	{ params: { idCourse } }: { params: { idCourse: string } }
) {
	try {
		let bodyData = await req.json();

		const res = await fetch(
			`http://localhost:3001/courses/arrange/${idCourse}`,
			{
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${
						req.cookies.get("access_token")?.value
					}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(bodyData),
				next: {
					revalidate: 0,
				},
			}
		);
		if (!res.ok) {
			return Response.error();
		}
		let data = await res.json();

		return Response.json(data);
	} catch (error) {
		return Response.error();
	}
}

export async function GET(req: NextRequest) {
	try {
		return Response.json({
			success: true,
		});
	} catch (error) {
		//
	}
}
