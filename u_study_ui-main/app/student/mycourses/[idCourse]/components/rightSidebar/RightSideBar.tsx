"use client";
import formatTime from "@/lib/utils/formatTime";
import { useVideoStore } from "@/lib/zustand/store";
import { PlayCircleOutlined } from "@ant-design/icons";
export default function RightSideBar({
	course,
}: {
	course: Course | undefined;
}) {
	const setVideo = useVideoStore((state) => state.setVideo);
	const storeVideo = useVideoStore((state) => state.video);

	if (!course) {
		return null;
	}
	const handleChangeVideo = (chapter_index: number, video_index: number) => {
		setVideo(course.chapters[chapter_index].videos[video_index]);
	};
	const content = course.chapters.map((chapter, chapter_index) => {
		return (
			<div key={chapter.id}>
				<p className="font-bold text-black/50">{chapter.title}</p>
				{chapter.videos.map((video, video_index) => {
					return (
						<div
							className={`w-full  h-10 flex items-center mt-2 pl-3 px-1 shadow-sm cursor-pointer ${
								video.id === storeVideo?.id
									? "text-colormain bg-colormain/10 rounded-lg transition-colors"
									: "text-colortext/40"
							}`}
							key={video.id}
							onClick={(e) => {
								handleChangeVideo(chapter_index, video_index);
							}}
						>
							<PlayCircleOutlined className="text-xl" />
							<p
								className={`ml-3 font-bold ${
									video.id === storeVideo?.id
										? "text-colormain"
										: "text-colortext/40"
								} overflow-hidden whitespace-nowrap text-ellipsis`}
							>
								{video.title}
							</p>
							<p
								className={`flex-1 text-right pr-3 ${
									video.id === storeVideo?.id
										? "text-colormain"
										: "text-colortext/40"
								} ml-3 font-semibold`}
							>
								{formatTime(video.duration)}
							</p>
						</div>
					);
				})}
			</div>
		);
	});
	return content;
}
