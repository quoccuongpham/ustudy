export default async function getAllCourse() {
	try {
		const res = await fetch("http://localhost:3001/courses", {
			method: "GET",
			headers: {
				Accept: "*/*",
				"User-Agent": "Thunder Client (https://www.thunderclient.com)",
				"Content-Type": "application/json",
			},
			credentials: "include",
			next: {
				revalidate: 0,
			},
		});
		if (!res.ok) {
			throw new Error("Failed to load course");
		}
		return res.json();
	} catch (error) {
		console.log(error);
	}
}
