import { cookies } from "next/headers";

export async function GET(
	req: Request,
	{ params }: { params: { idVideo: string } }
) {
	type ReturnData = Learning | {};
	const cookiesStore = cookies();
	try {
		const res = await fetch(
			`http://localhost:3001/learning/${params.idVideo}`,
			{
				headers: {
					Authorization: `Bearer ${
						cookiesStore.get("access_token")?.value
					}`,
				},
				next: {
					revalidate: 0,
				},
			}
		);
		const data: ReturnData = await res.json();
		return Response.json(data ?? {});
	} catch (error) {
		console.log(error);
		return Response.json({});
	}
}
