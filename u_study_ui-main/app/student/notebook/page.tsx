"use client";
import { useEffect, useState } from "react";

import { Empty, Tag } from "antd";

import { useNoteFolderStore } from "@/lib/zustand/store";

import formatTime from "@/lib/utils/formatTime";

export default function Notebook() {
	const idNote = useNoteFolderStore((state) => state.id);
	const [notes, setNotes] = useState<Note[]>([]);
	useEffect(() => {
		if (idNote) {
			fetch("http://localhost:3001/notes/video/" + idNote, {
				next: { revalidate: 0 },
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"access_token"
					)}`,
				},
			})
				.then((res) => {
					if (res.ok) {
						return res.json();
					}
				})
				.then((data) => {
					setNotes(data);
				});
		}
	}, [idNote]);
	console.log(notes);
	if (!idNote) {
		return (
			<div className="flex justify-center flex-1 h-[100vh - 80px] items-center">
				<Empty description="No note" />
			</div>
		);
	}

	return (
		<div className="flex-1 bg-white p-5 m-3 h-full rounded-md">
			{notes.map((note) => {
				return (
					<div
						key={note.id}
						className="hover:shadow-md hover:cursor-pointer p-2"
					>
						<Tag color="cyan">
							{formatTime(note.time?.toString() as string)}
						</Tag>
						<div
							dangerouslySetInnerHTML={{ __html: note.content }}
							className="mt-3"
						></div>
					</div>
				);
			})}
		</div>
	);
}
