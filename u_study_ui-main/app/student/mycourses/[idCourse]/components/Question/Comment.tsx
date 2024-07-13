import React from "react";
import Avatar from "antd/es/avatar/avatar";
import { FaCommentAlt } from "react-icons/fa";
import moment from "moment";
import { useCommentStore } from "@/lib/zustand/store";
export default function Comment({ data }: { data: CommentData | null }) {
	const setCommentStore = useCommentStore((state) => state.setComment);
	const commentStore = useCommentStore((state) => state.comment);
	console.log(data);
	return (
		<div className="flex items-start">
			<div>
				<Avatar
					size={48}
					// icon={<UserOutlined />}
					style={{
						marginRight: "15px",
						// backgroundColor: "black",
						textTransform: "uppercase",
					}}
					src={data?.user?.avatarUrl}
				>
					{/* {data?.user?.email?.charAt(0)} */}
				</Avatar>
			</div>
			<div className="flex-1">
				<p className="mb-1 text-justify">{data?.content}</p>
				<p className="font-semibold">
					<span className="mr-3 text-ellipsis text-gray-500">
						{data?.user?.email}
					</span>
					<span className="font-normal text-sm text-gray-400">
						{moment(data?.createdAt).format("ll")}
					</span>
				</p>
			</div>
			{commentStore == null && (
				<div
					className="pt-2 ml-5 text-gray-500 self-start hover:cursor-pointer"
					onClick={() => {
						setCommentStore(data);
					}}
				>
					<p className="inline-block mr-1">
						{data?.children?.length ?? 0}
					</p>
					<FaCommentAlt size={18} className="inline-block" />
				</div>
			)}
		</div>
	);
}
