import { FaMoneyBillAlt, FaUserGraduate } from "react-icons/fa";
import InfoCourseItem from "./InfoCourseItem";
import { FiStar } from "react-icons/fi";
import { ResponseTypeTeacherCourseDetail } from "@/app/api/teacher/courses/[idCourse]/detail/route";
import { cookies } from "next/headers";
export default async function InfoCourse({ idCourse }: { idCourse: string }) {
	const cookiesStore = cookies();
	const res = await fetch(
		`http://localhost:3001/courses/teacher/income/${idCourse}`,
		{
			headers: {
				Authorization: `Bearer ${
					cookiesStore.get("access_token")?.value
				}`,
			},
		}
	);
	const resRating = await fetch(
		"http://localhost:3001/review/averageRating/" + idCourse
	);
	if (!resRating.ok) {
		return <>Error</>;
	}
	if (!res.ok) {
		return <>Error</>;
	}
	const data: ResponseTypeTeacherCourseDetail = await res.json();
	const ratingObj: {
		_avg: {
			rating: number;
		};
	} = await resRating.json();
	return (
		<div className=" rounded-md flex gap-5">
			<InfoCourseItem
				title="Total Revenue"
				subTitle="Total"
				value={Intl.NumberFormat("vi-VN", {
					style: "currency",
					currency: "VND",
				}).format(data._sum.amount)}
				icon={<FaMoneyBillAlt size={20} />}
				color="text-cyan-500"
				background="bg-cyan-500/20"
			/>
			<InfoCourseItem
				title="Average Rating"
				subTitle="Rate"
				value={`${ratingObj._avg.rating ?? 5}/5`}
				icon={<FiStar size={20} />}
				color="text-orange-500"
				background="bg-orange-500/20"
			/>
			<InfoCourseItem
				title="Total Student"
				subTitle="Student"
				value={data._count.uuid}
				icon={<FaUserGraduate size={20} />}
				color="text-colormain"
				background="bg-colormain/20"
			/>
		</div>
	);
}
