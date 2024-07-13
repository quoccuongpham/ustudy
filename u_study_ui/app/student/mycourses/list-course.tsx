import { MyCourse } from "@/lib/student/getMyCourse";

import Image from "next/image";
import Link from "next/link";

import Card from "antd/es/card";

export default function ListCourses({ data }: { data: MyCourse[] }) {
	return (
		<div className="grid grid-cols-4 gap-5">
			{data.map((el) => (
				<Link
					key={el.course.id}
					href={`/student/mycourses/${el.course.id}`}
					className="text-inherit hover:text-inherit"
				>
					<Card
						title={el.course.title}
						cover={
							<Image
								src={el.course.image}
								alt={el.course.title}
								width={1000}
								height={1000}
								priority
							/>
						}
						hoverable
					></Card>
				</Link>
			))}
		</div>
	);
}
