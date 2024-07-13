"use client";
import Button from "antd/es/button";
import Tag from "antd/es/tag";

import CourseItem from "./components/CourseItem";
import { useState } from "react";
import { CourseWithDiscount } from "./page";

export default function CoursesView({
	courses,
	category,
}: {
	courses?: CourseWithDiscount[];
	category?: Category[];
}) {
	const [filter, setFilter] = useState(courses);
	const [categoryActive, setCategoryActive] = useState<number | null>(null);
	console.log(filter);
	return (
		<>
			<div className="overflow-x-scroll flex mb-3 no-scrollbar">
				{category?.map((el) => {
					return (
						<Button
							key={el.id}
							className="mr-3"
							type={
								categoryActive === el.id ? "primary" : "default"
							}
							onClick={() => {
								setFilter(
									courses?.filter(
										(course) => course.categoryId === el.id
									)
								);
								setCategoryActive(el.id);
							}}
						>
							{el.description}
						</Button>
					);
				})}
			</div>
			{categoryActive && (
				<Tag
					color="error"
					closable
					onClose={() => {
						setCategoryActive(null);
						setFilter(courses);
					}}
					className="font-bold"
				>
					Close filter
				</Tag>
			)}
			<div className="grid sm:grid-cols-4 gap-y-5 grid-cols-1 mt-10">
				{filter?.map((course) => {
					return <CourseItem course={course} key={course.id} />;
				})}
			</div>
		</>
	);
}
