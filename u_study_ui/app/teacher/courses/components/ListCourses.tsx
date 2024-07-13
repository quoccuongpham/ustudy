"use client";
import React, { useEffect, useState } from "react";
import getAllCourseTeacher from "@/lib/teacher/getAllCourseTeacher";
import CourseItem from "./CourseItem";
export default function ListCourses() {
	const [courses, setCourses] = useState<Course[]>();
	useEffect(() => {
		(async () => {
			const res = await getAllCourseTeacher();
			setCourses(res);
		})();
	}, []);
	if (courses?.length == 0) {
		return <div>No Course</div>;
	}

	const contentPublic = courses?.map((el) => {
		return <CourseItem data={el} key={el.id}></CourseItem>;
	});

	return (
		<div>
			<h2 className="font-bold text-lg mb-3">Public Course</h2>
			<div className="lg:flex gap-10 flex-wrap">{contentPublic}</div>
			{/* <h2 className="font-bold text-lg mt-5 mb-3">Private Course</h2>
			<div className="flex gap-10">{contentPublic}</div> */}
		</div>
	);
}
