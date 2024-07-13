"use client";

import Comment from "./Comment";
import { useEffect, useState } from "react";
import Empty from "antd/es/empty";

export default function ListComment({ id }: { id: string }) {
	const [listComment, setListComment] = useState<CommentData[] | null>(null);

	useEffect(() => {
		fetch(`/api/teacher/courses/${id}/comment`, {
			next: {
				revalidate: 0,
			},
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				return null;
			})
			.then((data) => setListComment(data));
	}, [id]);

	if (listComment === null || listComment?.length === 0) {
		return <Empty />;
	}

	const content = listComment?.map((comment) => {
		return (
			<div key={comment.id} className="mb-5">
				<Comment data={comment} />
			</div>
		);
	});
	return content;
}
