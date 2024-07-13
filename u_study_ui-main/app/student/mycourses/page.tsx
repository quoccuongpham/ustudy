import { cookies } from "next/headers";

import { BookOutlined } from "@ant-design/icons";

import { MyCourse } from "@/lib/student/getMyCourse";

import ListCourses from "./list-course";

export default async function MyCourses() {
	const cookiesStore = cookies();
	const resListCourses = await fetch("http://localhost:3001/courses/user", {
		headers: {
			Authorization: `Bearer ${cookiesStore.get("access_token")?.value}`,
		},
		next: {
			revalidate: 0,
		},
	});
	let listCourses: MyCourse[] = [];

	if (resListCourses.ok) {
		let courses: MyCourse[] = await resListCourses.json();
		listCourses = courses;
	}
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
						<p className="font-bold text-lg">
							{listCourses?.length ?? 0}
						</p>
						<p>Total courses</p>
					</div>
				</div>
			</div>
			<div className="bg-white rounded-lg p-3 pb-10">
				<h1 className="text-lg font-bold mb-5 text-colortext">
					My Courses
				</h1>
				<div className="">
					<ListCourses data={listCourses} />
				</div>
			</div>
		</section>
	);
}
