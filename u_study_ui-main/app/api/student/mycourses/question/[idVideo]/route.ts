import { NextRequest } from "next/server";

export async function POST(
	req: NextRequest,
	{ params }: { params: { idVideo: string } }
) {
	try {
		const token = req.cookies.get("access_token")?.value;
		const bodyReq: {
			content: string;
		} = await req.json();
		const formData: {
			videoId: number;
			content: string;
		} = {
			...bodyReq,
			videoId: Number.parseInt(params.idVideo),
		};

		if (token) {
			const res = await fetch(`http://localhost:3001/comment`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			if (res.ok) {
				let data = await res.json();
				return Response.json(data);
			} else {
				return Response.error();
			}
		} else {
			return Response.error();
		}
	} catch (error) {
		console.log(error);
		return Response.error();
	}
}
export async function GET(
	req: NextRequest,
	{ params }: { params: { idVideo: string } }
) {
	try {
		let token = req.cookies.get("access_token")?.value;
		if (!token) {
			return Response.error();
		}
		const res = await fetch(
			`http://localhost:3001/comment?videoId=${params.idVideo}`,
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
			console.log(data);
			return Response.json(data);
		} else {
			return Response.error();
		}
	} catch (error) {
		console.log(error);
		return Response.error();
	}
}
