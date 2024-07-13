export async function handleUpdateAvatar(link: string, uuid: string) {
	try {
		const res = await fetch(`http://localhost:3001/users/` + uuid, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("access_token")}`,
			},
			body: JSON.stringify({
				avatarUrl: link,
			}),
		});
		if (!res.ok) {
			return null;
		}

		return res.json();
	} catch (error) {
		return null;
	}
}
