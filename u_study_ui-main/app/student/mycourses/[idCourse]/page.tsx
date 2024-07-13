import BreadcrumbCustom from "@/app/components/BreadcrumbCustom";
import { StudentMycourse } from "@/lib/breadcrumPath/breadcrumPath";
import getContentCourse from "@/lib/student/getContentCourse";
import MainContent from "./components/mainContent/MainContent";
import Progress from "antd/es/progress";
import RightSideBar from "./components/rightSidebar/RightSideBar";
type Props = {
	params: {
		idCourse: string;
	};
};
export default async function Learning({ params: { idCourse } }: Props) {
	let data = await getContentCourse(idCourse);

	if (!data?.course) {
		return null;
	}

	function getProcess(chapters: Chapter[] | undefined) {
		if (chapters) {
			const obj = {
				total: 0,
				completed: 0,
				process: 0,
			};
			chapters.forEach((chapter) => {
				chapter.videos.forEach((video) => {
					obj.total += 1;
					if (video?.learnings?.at(0)?.completed) {
						obj.completed += 1;
					}
				});
			});
			if (obj.total > 0) {
				obj.process = Math.floor((obj.completed / obj.total) * 100);
			}
			return obj;
		}
		return {
			total: 0,
			completed: 0,
			process: 0,
		};
	}
	const objProgess = getProcess(data?.course?.chapters);
	return (
		<section className="lg:grid grid-cols-4">
			{/* Main content */}
			<div className="col-span-3 p-3 h-[calc(100vh-60px)] overflow-y-scroll no-scrollbar">
				<BreadcrumbCustom path={StudentMycourse(idCourse)} />
				{/* {data?.course ? <MainContent course={data.course} /> : null} */}
				<MainContent course={data.course} />
			</div>

			{/* Right sidebar */}
			<div className="bg-white col-span-1 p-3 h-[calc(100vh-60px)] overflow-y-scroll no-scrollbar lg:block hidden">
				<h2 className="text-base font-bold">Your Courses Progress</h2>
				<div className="bg-colormain/20 px-3 py-3 rounded-md mt-3">
					<p>{`${objProgess.completed}/${objProgess.total} lessons`}</p>
					<Progress
						percent={objProgess.process}
						strokeColor="#3cbea9"
						style={{ padding: 0, margin: 0 }}
					/>
				</div>
				<h2 className="text-base font-bold mt-5">Lessons</h2>
				<section className="mt-2">
					<RightSideBar course={data?.course} />
				</section>
			</div>
		</section>
	);
}
