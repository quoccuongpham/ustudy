import { cookies } from "next/headers";
import ListCourses from "./components/ListCourses";
import { BookOutlined } from "@ant-design/icons";

async function getCourse() {
	try {
		let cookiesStore = cookies();
		const res = await fetch("http://localhost:3001/courses/teacher", {
			headers: {
				Authorization: `Bearer ${
					cookiesStore.get("access_token")?.value
				}`,
			},
		});
		if (!res.ok) {
			return null;
		}
		return res.json();
	} catch (error) {
		console.log(error);
		return null;
	}
}

export default async function MyCourses() {
	const courses: [] = await getCourse();

	return (
		<section className="pt-3 px-5">
			<h2 className="text-xl font-bold mb-5 text-colortext">
				Courses Overview
			</h2>
			<div className="mb-5">
				<div className="bg-colormain/20 pl-8 w-52 h-20 rounded-md border-2 border-colormain flex justify-start items-center">
					<span className="size-7 bg-white text-center rounded-md text-colormain">
						<BookOutlined className="h-full" />
					</span>
					<div className="ml-3">
						<p className="font-bold text-lg">{courses?.length}</p>
						<p>Total courses</p>
					</div>
				</div>
			</div>
			<div className="bg-white rounded-md min-h-screen mb-3 p-3">
				<ListCourses />
			</div>
		</section>
	);
}
