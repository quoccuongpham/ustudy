import React from "react";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
type Props = {
	data: Course;
};
import Button from "antd/es/button";
export default function CourseItem({ data }: Props) {
	const router = useRouter();
	return (
		<div className="shadow-md rounded-md mb-5 lg:w-72">
			<div>
				<Image
					src={data.image}
					alt="nestjs"
					width={1000}
					height={1000}
					priority
					className="w-full rounded-md block"
				></Image>
			</div>
			<div className="p-3">
				<p className="text-lg font-bold mb-5 overflow-hidden whitespace-nowrap text-ellipsis">
					{data.title}
				</p>
				<div>
					<Button
						type="primary"
						style={{
							backgroundColor: "#3cbea9",
							marginRight: "10px",
						}}
						onClick={() => {
							router.push(`/teacher/courses/view/${data.id}`);
						}}
					>
						View
					</Button>
					<Button
						type="primary"
						style={{ backgroundColor: "#3cbea9" }}
						onClick={() => {
							router.push(`/teacher/courses/update/${data.id}`);
						}}
					>
						Update
					</Button>
				</div>
			</div>
		</div>
	);
}
