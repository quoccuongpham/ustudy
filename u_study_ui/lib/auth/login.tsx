import Swal from "sweetalert2";
export default async function login(data: {
	email: string;
	password: string;
}): Promise<{
	uuid: string;
	access_token: string;
	role: ROLE;
	name: string;
	email: string;
	avatarUrl: string;
	balance: number;
}> {
	// http://localhost:3001/auth/login
	const res = await fetch("/api/auth/login", {
		method: "POST",
		body: JSON.stringify(data),
		credentials: "include",
		headers: {
			Accept: "*/*",
			"Access-Control-Allow-Origin": "*",
			"User-Agent": "Thunder Client (https://www.thunderclient.com)",
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) {
		if (res.status === 406) {
			let errorData = await res.json();
			Swal.fire({
				icon: "error",
				title: "Error",
				text: errorData?.message,
			});
		}
	}
	return res.json();
}
