import BreadcrumbCustom from "@/app/components/BreadcrumbCustom";
import { TeacherMyCourseView } from "@/lib/breadcrumPath/breadcrumPath";
import { FaMoneyBillAlt, FaUserGraduate } from "react-icons/fa";
import { FiStar, FiMessageCircle } from "react-icons/fi";
import { cookies } from "next/headers";
import InfoCourseItem from "../components/InfoCourseItem";

import ListComment from "../components/ListComment";
import InfoCourse from "../components/InfoCourse";

export default async function ViewCourse({
	params: { idCourse },
}: {
	params: { idCourse: string };
}) {
	const cookieStore = cookies();
	const res = await fetch(
		`http://localhost:3001/courses/teacher/${idCourse}`,
		{
			headers: {
				Authorization: `Bearer ${
					cookieStore.get("access_token")?.value
				}`,
			},
		}
	);

	if (!res.ok) {
		<div>Not found</div>;
	}
	let data: Course = await res.json();

	return (
		<div className="p-3">
			<div className="mb-5">
				<BreadcrumbCustom path={TeacherMyCourseView(idCourse)} />
			</div>
			<div className="font-bold text-lg mb-5">
				<p>{data.title}</p>
			</div>
			<div className="flex gap-10">
				{/* LEFT */}
				<div className="flex-1">
					<InfoCourse idCourse={idCourse} />
					<div className="bg-white mt-3 rounded-md p-3">
						<p className="font-semibold text-base mb-5">Question</p>
						<div className="p-3 h-80 overflow-y-scroll custom-scrollbar">
							<ListComment id={idCourse} />
						</div>
					</div>
				</div>
				{/* RIGHT */}
				<div className="bg-white rounded-md w-1/3 p-3">
					<p className="font-semibold text-base ">Content</p>
					<div className="h-4/5 overflow-y-scroll custom-scrollbar">
						{data.chapters?.map((chapter) => {
							return (
								<div className="p-3" key={chapter.id}>
									<p className="font-bold text-gray-500 mb-3 mt-3">
										{chapter.title}
									</p>
									{chapter?.videos?.map((video) => {
										return (
											<div
												key={video.id}
												className="w-full  h-10 flex items-center mt-2 pl-3 px-1 cursor-pointer rounded-md shadow-sm"
											>
												<p>{video.title}</p>
											</div>
										);
									})}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
