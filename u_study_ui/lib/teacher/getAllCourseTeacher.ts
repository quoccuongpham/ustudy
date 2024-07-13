export default async function getAllCourseTeacher() {
	try {
		const res = await fetch(`http://localhost:3001/courses/teacher`, {
			method: "GET",
			headers: {
				Accept: "*/*",
				"User-Agent": "Thunder Client (https://www.thunderclient.com)",
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("access_token")}`,
			},
			credentials: "include",
		});
		if (!res.ok) {
			throw new Error();
		}
		return res.json();
	} catch (error) {
		console.log(error);
	}
}
