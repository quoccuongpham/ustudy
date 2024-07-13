import { server_host } from "../utils/constant";

export default async function getDataCourse(
	idCourse: number
): Promise<Course | undefined> {
	try {
		const res = await fetch(`${server_host}/courses/${idCourse}`, {
			cache: "no-store",
		});
		if (!res.ok) {
			throw new Error("failed to get course");
		}
		return res.json();
	} catch (error) {
		console.log("getDataCourse:::failed to get course");
	}
}
