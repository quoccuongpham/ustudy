export async function POST(request: Request) {
	try {
		const data = await request.json();
		console.log(data);
		const res = await fetch("http://localhost:3001/auth/register", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!res.ok) {
			return Response.json({ success: false });
		}
		return Response.json({ success: true });
	} catch (error) {
		return Response.json({ success: false });
	}
}
