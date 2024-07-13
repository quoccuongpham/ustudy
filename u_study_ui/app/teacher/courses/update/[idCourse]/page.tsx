"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

import Main from "./components/Main";
import Detail from "./components/Detail";

import getCourseTeacher from "@/lib/teacher/getCourseTeacher";

type Props = {
	params: {
		idCourse: string;
	};
};
export default function UpdateCourse({ params: { idCourse } }: Props) {
	const [course, setCourse] = useState<Course | undefined>(undefined);
	const router = useRouter();
	useEffect(() => {
		try {
			(async () => {
				const res = await getCourseTeacher(+idCourse);
				setCourse(res);
			})();
		} catch (error) {
			console.log(error);
		}
	}, [idCourse]);

	const handleRefresh = useCallback(() => {
		router.refresh();
	}, [router]);
	if (!course) {
		return "Empty";
	}

	return (
		<>
			<h1 className="pl-3 pt-3 text-lg font-bold text-gray-600">
				Update Course
			</h1>
			<div className="lg:flex gap-5 p-3">
				<section className="lg:flex-1 lg:min-h-screen bg-white p-3 rounded-md">
					<Main course={course} handleRefresh={handleRefresh} />
				</section>
				<section className="lg:w-[400px] lg:mt-0 mt-3">
					<Detail course={course} />
				</section>
			</div>
		</>
	);
}
