import { message } from "antd";
import Comment from "./Comment";
import { useEffect, useRef, useState, Suspense } from "react";
import { useCommentStore, useVideoStore } from "@/lib/zustand/store";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function Question() {
	const inputRef = useRef<HTMLTextAreaElement | null>(null);
	const video = useVideoStore((state) => state.video);
	const [data, setData] = useState<CommentData[] | null>(null);
	const commentStore = useCommentStore((state) => state.comment);
	const setCommentStore = useCommentStore((state) => state.setComment);

	useEffect(() => {
		fetch(`/api/student/mycourses/question/${video?.id}`)
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					setData(null);
				}
			})
			.then((data) => setData(data));
	}, [video?.id, commentStore]);
	const handlePostQuestion = async (formData: FormData) => {
		if (commentStore) {
			formData.append("parentId", commentStore.id.toString());
		}
		const res = await fetch(
			`/api/student/mycourses/question/${video?.id}`,
			{
				method: "POST",
				body: JSON.stringify(Object.fromEntries(formData)),
			}
		);
		if (res.ok) {
			res.json().then((newComment) => {
				if (commentStore) {
					let currentComment = { ...commentStore };
					currentComment.children.push(newComment);
					setCommentStore(currentComment);
					// setData((prev) => {
					// 	let newCommentState = prev?.map((val) => {
					// 		if (val.id === commentStore.id) {
					// 			val.children.push(newComment);
					// 			return val;
					// 		} else {
					// 			return val;
					// 		}
					// 	});
					// 	return newCommentState ? [...newCommentState] : null;
					// });
				} else {
					setData((prev) => {
						if (Array.isArray(prev)) {
							return [newComment, ...prev];
						} else {
							return [newComment];
						}
					});
				}
			});
			message.success("comment posted");
		} else {
			message.error("Can't post a comment");
		}
		inputRef.current!.value = "";
	};

	return (
		<div className="p-5">
			{/* Header */}
			<h2 className="font-semibold text-lg text-gray-800">
				All questions for this video ({data?.length})
			</h2>
			<Suspense fallback={<p className="bg-black">loading...</p>}>
				{/* Comment */}
				<div
					className={`pt-5 mb-20 ${
						commentStore ? "hidden" : "block"
					}`}
				>
					{data
						? data.map((comment) => (
								<div key={comment.id} className="mb-8">
									<Comment data={comment} />
								</div>
						  ))
						: null}
				</div>
				{/* Reply */}
				<div
					className={`pt-5 mb-20 ${
						commentStore ? "block" : "hidden"
					}`}
				>
					<div
						onClick={() => {
							setCommentStore(null);
						}}
						className="font-bold mb-5 hover:cursor-pointer hover:text-colormain inline-block"
					>
						<ArrowLeftOutlined></ArrowLeftOutlined>
						<p className="inline-block ml-2">Back</p>
					</div>
					{commentStore && <Comment data={commentStore} />}
					{/* Comment children */}
					<div className="mt-5 pl-14">
						{commentStore?.children?.map((comment) => (
							<div key={comment.id} className="mb-8">
								<Comment data={comment} />
							</div>
						))}
					</div>
				</div>
			</Suspense>

			{/* Post Comment */}
			<div>
				<form className="mb-6" action={handlePostQuestion}>
					<div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
						<textarea
							ref={inputRef}
							id="comment"
							rows={3}
							className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
							placeholder={
								commentStore
									? `Reply for ${commentStore?.user?.email}`
									: "Write a question..."
							}
							name="content"
							required
						></textarea>
					</div>
					<button
						type="submit"
						className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-colormain rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-colormain/80"
					>
						Post question
					</button>
				</form>
			</div>
		</div>
	);
}
