import Image from "next/image";
import Link from "next/link";
import { formaterVND } from "@/lib/utils/formatCurrency";
import { CourseWithDiscount } from "../page";
export default function CourseItem({ course }: { course: CourseWithDiscount }) {
	return (
		<Link
			href={`/student/courses/${course.id}`}
			className="text-black hover:text-black"
		>
			<div className="w-60 h-60  hover:shadow-lg hover:opacity-75 transition-shadow duration-300 rounded-md cursor-pointer border bg-white border-colormain/40">
				<div className="w-60 h-36 rounded-md">
					<Image
						src={course.image}
						alt={course.title}
						// fill={true}
						width={2000}
						height={1500}
						priority={true}
						style={{ objectFit: "cover" }}
						className="rounded-t-md w-60"
					></Image>
				</div>
				<div className="p-2">
					<p className="font-bold whitespace-nowrap overflow-hidden text-ellipsis">
						{course.title}
					</p>
					<p className="text-gray-500">{course.user.name}</p>
					<p
						className={
							"font-bold" +
							(course?.discounts?.length > 0
								? " line-through text-gray-500"
								: "")
						}
					>
						{formaterVND.format(course.price)}
					</p>
					{course?.discounts?.length > 0 &&
						course?.discounts?.at(0)?.expiredAt &&
						new Date() <
							new Date(
								course?.discounts?.at(0)?.expiredAt || ""
							) && (
							<p className="font-bold text-red-500">
								{formaterVND.format(
									(course.price *
										(100 -
											(course?.discounts?.at(0)
												?.percentage || 0))) /
										100
								)}
							</p>
						)}
				</div>
			</div>
		</Link>
	);
}
