import React from "react";
import { MyCourse } from "@/lib/student/getMyCourse";
import CourseItem from "./CourseItem";
export default function Courses({
	list_courses,
}: {
	list_courses: MyCourse[];
}) {
	if (!list_courses) {
		return <div>No Courses</div>;
	}

	const content = list_courses.map((el) => {
		return <CourseItem data={el} key={el.courseId} />;
	});

	return content;
}
