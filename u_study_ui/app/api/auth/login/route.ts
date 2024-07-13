import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
	try {
		let clientBody = await req.json();
		let cookiesStore = cookies();
		let bodyContent = JSON.stringify(clientBody);
		const res = await fetch("http://localhost:3001/auth/login", {
			method: "POST",
			body: bodyContent,
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!res.ok) {
			if (res.status === 406) {
				return NextResponse.json(
					{
						error: true,
						message: "Your account has been banned",
					},
					{ status: 406 }
				);
			}
			return Response.json({ error: true, message: "Fail to login" });
		}
		const data: {
			access_token: string;
			role: ROLE;
			name: string;
			email: string;
		} = await res.json();
		cookiesStore.set("access_token", data.access_token);
		return Response.json(data);
	} catch (error) {
		return Response.json({ error: true });
	}
}
