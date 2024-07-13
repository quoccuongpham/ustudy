import { Metadata } from "next";

// components
import CourseItem from "./components/CourseItem";
import CoursesView from "./courses-view";

// api
import getAllCourse from "@/lib/student/getAllCourse";
import getCategory from "@/lib/general/getCategory";

// antd
import Button from "antd/es/button";

export const metadata: Metadata = {
	title: "Courses",
	description: "All courses of website, recommend courses",
};

export type CourseWithDiscount = Course & { discounts: Discount[] };

export default async function Courses() {
	const getDataCourses: Promise<CourseWithDiscount[]> = getAllCourse();

	let dataCourses = await getDataCourses;
	let categories = (await getCategory()) as Category[];

	return (
		<section className="pt-3 px-5">
			<h1 className="text-xl font-bold mb-5 text-colortext">
				Courses recommend
			</h1>

			<CoursesView courses={dataCourses} category={categories} />

			{/* <div className="grid sm:grid-cols-4 gap-y-5 grid-cols-1">
				{dataCourses?.map((course) => {
					return <CourseItem course={course} key={course.id} />;
				})}
			</div> */}
		</section>
	);
}
