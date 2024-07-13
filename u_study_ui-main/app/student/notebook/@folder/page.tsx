"use client";
import { useState, useEffect } from "react";

import Tree from "antd/es/tree/Tree";
import type { TreeDataNode, TreeProps } from "antd";

import type { NoteGroupByCourse } from "./utils";

import { useNoteFolderStore } from "@/lib/zustand/store";

export default function Folder() {
	const [notes, setNotes] = useState<NoteGroupByCourse[]>([]);

	const setIdNote = useNoteFolderStore((state) => state.setId);

	useEffect(() => {
		fetch("http://localhost:3001/notes/course", {
			next: { revalidate: 0 },
			headers: {
				Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
	}, []);

	let treeData: TreeDataNode[] = [];

	if (notes.length > 0) {
		treeData = notes.map((el) => {
			return {
				key: `${el.course.id}`,
				title: el.course.title,
				children: el.course.chapters.map((chapter) => {
					return {
						key: `${el.course.id}-${chapter.id}`,
						title: chapter.title,
						children: chapter.videos.map((video) => {
							return {
								key: `${el.course.id}-${chapter.id}-${video.id}`,
								title: video.title,
							};
						}),
					};
				}),
			};
		});
	}

	const handleSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
		const keyNote = selectedKeys[0].toString().split("-");
		if (keyNote.length === 3) {
			setIdNote(Number.parseInt(keyNote[2]));
		}
	};
	return (
		<div className="pt-3 bg-white">
			<h2 className="text-lg font-bold mb-5 text-colortext">
				Notes for video
			</h2>
			<div>
				<Tree
					treeData={treeData}
					showIcon={true}
					defaultExpandParent
					showLine
					blockNode
					onSelect={handleSelect}
				/>
			</div>
		</div>
	);
}
