import { server_host } from "../utils/constant";
import Swal from "sweetalert2";
export default async function getCourseTeacher(idCourse: number) {
	try {
		const res = await fetch(`${server_host}/courses/teacher/${idCourse}`, {
			method: "GET",
			headers: {
				Accept: "*/*",
				"User-Agent": "Thunder Client (https://www.thunderclient.com)",
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("access_token")}`,
			},
			credentials: "include",
			next: {
				tags: ["teacher_course"],
				revalidate: 0,
			},
		});
		if (!res.ok) {
			console.log("res not ok");
			console.log(res);
		}
		if (res.status == 404) {
			Swal.fire({
				icon: "error",
				text: "Not Found",
			});
		}
		return res.json();
	} catch (error) {
		Swal.fire({
			icon: "error",
			text: "Error",
		});
	}
}
