import { NextRequest } from "next/server";

export type ResponseTypeTeacherCourseDetail = {
	_sum: {
		amount: number;
	};
	_count: {
		uuid: number;
	};
	students: {
		user: {
			name: string;
			email: string;
		};
		createdAt: string;
	}[];
};

export async function GET(
	req: NextRequest,
	{ params: { idCourse } }: { params: { idCourse: string } }
) {
	try {
		let data: ResponseTypeTeacherCourseDetail;
		const res = await fetch(
			`http://localhost:3001/courses/teacher/income/${idCourse}`,
			{
				headers: {
					Authorization: `Bearer ${
						req.cookies.get("access_token")?.value
					}`,
				},
			}
		);
		if (!res.ok) {
			return Response.error();
		}
		data = await res.json();
		return Response.json(data);
	} catch (error) {
		return Response.error();
	}
}
