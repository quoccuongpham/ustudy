import { cookies } from "next/headers";

export default async function get_folder(id?: number) {
	try {
		let url = "http://localhost:3001/folders";
		const cookiesStore = cookies();
		if (id) {
			url += `?parentFolderId=${id}`;
		}
		const res = await fetch(url, {
			headers: {
				Authorization: `Bearer ${
					cookiesStore.get("access_token")?.value
				}`,
			},
		});
		if (res.ok) {
			return res.json();
		}
		return null;
	} catch (error) {
		return null;
	}
}
