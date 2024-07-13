"use client";
import { Collapse } from "antd";

import ChapterItems from "./ChapterItems";

export default function ListVideo({ listVideo }: { listVideo: Chapter[] }) {
	return (
		<>
			<Collapse
				collapsible="header"
				items={listVideo.map((chapter) => {
					return {
						key: chapter.id,
						label: chapter.title,
						children: <ChapterItems items={chapter?.videos} />,
					};
				})}
			/>
		</>
	);
}
