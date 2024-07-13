import React, { useRef, useState } from "react";
import Avatar from "antd/es/avatar/avatar";
import { FaCommentAlt } from "react-icons/fa";
import moment from "moment";
import { useCommentStore } from "@/lib/zustand/store";
import Modal from "antd/es/modal/Modal";
import { message } from "antd";
import { useRouter } from "next/navigation";
export default function Comment({ data }: { data: CommentData | null }) {
	const setCommentStore = useCommentStore((state) => state.setComment);
	const commentStore = useCommentStore((state) => state.comment);
	const appendChild = useCommentStore((state) => state.appendChild);
	const [isOpen, setIsOpen] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);
	const router = useRouter();
	const handleReplyQuestion = async (formData: FormData) => {
		if (data) {
			formData.append("parentId", data?.id.toString());
		}
		const res = await fetch(
			`/api/student/mycourses/question/${data?.videoId}`,
			{
				method: "POST",
				body: JSON.stringify(Object.fromEntries(formData)),
			}
		);
		if (res.ok) {
			let commentChild = await res.json();
			appendChild(commentChild);
			message.success("Replied");
			formRef.current?.reset();
		}
	};
	return (
		<div className="flex items-start">
			<div>
				<Avatar
					size={48}
					// icon={<UserOutlined />}
					style={{
						marginRight: "15px",
						// backgroundColor: "black",
						// textTransform: "uppercase",
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
				<p className="font-medium text-colormain underline">
					{data?.video?.title}
				</p>
			</div>
			{isOpen === false && (
				<div
					className="pt-2 ml-5 text-gray-500 self-start hover:cursor-pointer"
					onClick={() => {
						setCommentStore(data);
						setIsOpen(true);
					}}
				>
					<p className="inline-block mr-1">
						{data?.children?.length ?? 0}
					</p>
					<FaCommentAlt size={18} className="inline-block" />
				</div>
			)}
			<Modal
				title={`Reply for ${commentStore?.user.email}`}
				style={{ top: "50px" }}
				open={isOpen}
				footer={null}
				closable
				onCancel={() => {
					setIsOpen(false);
					router.refresh();
				}}
				width={1000}
			>
				<div className="flex h-[calc(100vh-150px)]">
					<div className="w-1/2">
						<video
							src={`http://localhost:3002/video/stream/${data?.videoId}`}
							controls
							className="rounded-md"
						></video>
						<p className="text-lg font-semibold mt-3">
							{commentStore?.video?.title}
						</p>
					</div>
					<div className="h-full flex-1 overflow-y-scroll custom-scrollbar p-3">
						<Comment data={commentStore} />
						<form
							action={handleReplyQuestion}
							className="mt-3 mb-3 ml-12"
							ref={formRef}
						>
							<div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
								<textarea
									name="content"
									id=""
									rows={3}
									className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
									placeholder={`Reply for ${commentStore?.user.email}`}
									required
								></textarea>
							</div>
							<button className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-colormain rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-colormain/80">
								Reply
							</button>
						</form>
						<div className="pl-12 mt-5">
							{commentStore?.children?.map((comment) => {
								return (
									<div key={comment.id} className="mb-5">
										<Comment data={comment} />
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
}
