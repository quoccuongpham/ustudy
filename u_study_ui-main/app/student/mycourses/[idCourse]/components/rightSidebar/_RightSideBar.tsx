import React, { useContext } from "react";
import { PlayCircleOutlined } from "@ant-design/icons";

type Props = {
	data: Chapter[];
	handleChangeVideo: (video: Video) => void;
};

export default function RightSideBar({ data, handleChangeVideo }: Props) {
	const content = data.map((el) => {
		return (
			<div key={el.id}>
				<p className="font-bold text-black/50">{el.title}</p>
				{el.videos.map((video) => {
					return (
						<div
							className="w-full  h-10 flex items-center mt-2 pl-3 px-1 text-colortext/40 shadow-sm cursor-pointer"
							key={video.sequenceNumber}
							onClick={() => {
								console.log(video.title);
								handleChangeVideo(video);
							}}
						>
							<PlayCircleOutlined className="text-xl" />
							<p className="ml-3 font-bold text-black">
								{video.title}
							</p>
							<p className="flex-1 text-right pr-3">
								{video.duration}
							</p>
						</div>
					);
				})}
			</div>
		);
	});
	return content;
}
