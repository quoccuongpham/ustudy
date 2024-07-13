import { PlayCircleFilled } from "@ant-design/icons";
import formatTime from "@/lib/utils/formatTime";
export default function ChapterItems({ items }: { items: Video[] }) {
	const content = (
		<div>
			{items.map((item, i) => {
				return (
					<div key={i} className="flex justify-between mb-2 pl-10">
						<p className="underline font-bold">
							<span className="text-gray-500">
								<PlayCircleFilled className="mr-2 " />
							</span>
							{item.title}
						</p>
						<p className="font-bold">
							{formatTime(item.duration.toString())}
						</p>
					</div>
				);
			})}
		</div>
	);
	return content;
}
