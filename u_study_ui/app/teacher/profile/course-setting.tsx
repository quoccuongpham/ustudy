"use client";
// import { useEffect, useState } from "react";

// import Input from "antd/es/input";

export default function CourseSetting() {
	// const [courses, setCourses] = useState<Course[]>([]);
	// useEffect(() => {
	// 	fetch("/api/teacher/courses")
	// 		.then((res) => {
	// 			if (res.ok) {
	// 				return res.json();
	// 			}
	// 			return null;
	// 		})
	// 		.then((data) => {
	// 			console.log(data);

	// 			setCourses(data);
	// 		});
	// }, []);
	// console.log(courses);
	return (
		<div>
			<h2 className="font-bold text-base mb-3">Course Settings</h2>
			{/* <div>
				<p className="font-bold mb-2 text-blue-500">Discount:</p>
				<form
					action={async (formData) => {
						console.log(formData);
					}}
					className="ml-5"
				>
					<label htmlFor="course" className="font-semibold">
						Select course: <br />
					</label>
					<select name="course" id="course">
						{courses.map((course) => {
							return (
								<option value={course.id} key={course.id}>
									{course.title}
								</option>
							);
						})}
					</select>
					<label
						htmlFor="discount"
						className="font-semibold block mt-2 mb-2"
					>
						Discount: <br />
					</label>
					<Input
						name="discount"
						id="discount"
						prefix="%"
						type="number"
						max={100}
						min={0}
						defaultValue={0}
					/>
				</form>
			</div> */}
		</div>
	);
}
