import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { MyCourse } from "@/lib/student/getMyCourse";
const Progress = dynamic(() => import("antd/es/progress"), { ssr: false });

export default function CourseItem({ data }: { data: MyCourse }) {
	return (
		<div className="border border-colormain/40 rounded-md hover:cursor-pointer hover:shadow-md">
			<Link
				href={`/student/mycourses/${data.course.id}`}
				className="text-inherit hover:text-inherit"
			>
				<Image
					src={data.course.image}
					alt={data.course.title}
					width={1000}
					height={1000}
					priority={true}
					className="w-full rounded-md"
				></Image>
				<div className="p-3">
					<div className="">
						<p className="text-gray-500 mt-5">
							{data.course.user.name}
						</p>
						<p className="text-lg font-bold mb-5">
							{data.course.title}
						</p>
					</div>
					{/* <Progress percent={30} strokeColor="#3cbea9" /> */}
					{/* <div className="">
						<Link
							href={`/student/mycourses/${data.course.id}`}
							className="text-right w-full block font-bold text-colormain hover:underline hover:text-colormain"
						>
							View &gt;
						</Link>
					</div> */}
				</div>
			</Link>
		</div>
	);
}
