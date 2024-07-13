"use client";
import React, {
	useEffect,
	useState,
	useLayoutEffect,
	useCallback,
} from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useCourseStore, useVideoStore } from "@/lib/zustand/store";
import CardNote, { toolbarOptions } from "./CardNote";
import { Button, Modal } from "antd";
import formatTime from "@/lib/utils/formatTime";
import { CreateNoteData } from "@/app/api/student/mycourses/note/video/[idVideo]/route";

export default function Note() {
	const video = useVideoStore((state) => state.video);
	const time = useVideoStore((state) => state.time);
	const course = useCourseStore((state) => state.course);
	const playerRef = useVideoStore((state) => state.playerRef);
	const [notes, setNotes] = useState<Note[]>();
	const [createNoteData, setCreateNoteData] = useState<CreateNoteData>();
	const [isCreateNote, setIsCreateNote] = useState<boolean>(false);
	const [isModalEdit, setIsModalEdit] = useState<boolean>(false);

	// define a function to delete one note in notes using id of note
	const deleteNote = useCallback(
		(id: number) => {
			const noteFiltered = notes?.filter((val) => val.id !== id);
			setNotes(noteFiltered);
		},
		[notes]
	);
	// function to edit note
	const editNote = (id: number, noteEdited: Note) => {
		const noteFiltered = notes?.map((val) => {
			if (val.id === id) {
				return noteEdited;
			}
			return val;
		});
		setNotes(noteFiltered);
	};

	useEffect(() => {
		if (video) {
			fetch(`/api/student/mycourses/note/video/${video?.id}`, {
				next: {
					revalidate: 0,
				},
			})
				.then((res) => {
					if (res.ok) {
						return res.json();
					}
				})
				.then((data) => {
					console.log("data:::", data);
					setNotes(data);
				});
		}
	}, [video]);
	return (
		<div className="pt-3 px-2 min-h-screen">
			<p className="font-bold text-lg ml-3 mb-5">{video?.title}</p>
			{notes?.map((val, index) => (
				<div
					className="p-3 bg-gray-100 rounded-md m-3 hover:shadow-md hover:cursor-pointer"
					key={val.id}
				>
					<CardNote
						note={val}
						active={false}
						time={val?.time}
						deleteNote={deleteNote}
						handleEdit={editNote}
					/>
				</div>
			))}
			<div className="p-3">
				<div
					className="border mb-3 p-3 rounded-md"
					style={{
						display: isCreateNote ? "block" : "none",
					}}
				>
					<ReactQuill
						onChange={(e, delta, source) => {
							if (source === "user" && video && course) {
								setCreateNoteData({
									content: e,
									time: Math.round(time),
									title: video.title,
									videoId: video.id,
									courseId: course.id,
								});
							}
						}}
					/>
				</div>
				<Button
					type="primary"
					style={{
						display: isCreateNote ? "inline-block" : "none",
						marginBottom: 10,
					}}
					onClick={() => {
						setIsCreateNote(false);
						fetch(
							`/api/student/mycourses/note/video/${video?.id}`,
							{
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify(createNoteData),
							}
						)
							.then((res) => {
								if (res.ok) {
									return res.json();
								}
							})
							.then((data) => {
								console.log("data:::", data);
								if (notes) {
									setNotes([...notes, data]);
								}
							})
							.catch((error) => {
								console.log("error:::", error);
							});
					}}
				>
					Create
				</Button>
				<Button
					danger
					style={{
						display: isCreateNote ? "inline-block" : "none",
						marginBottom: 10,
						marginLeft: 10,
					}}
					onClick={() => {
						setIsCreateNote(false);
					}}
				>
					Cancel
				</Button>
				<Button
					onClick={() => {
						setIsCreateNote(true);
					}}
					style={{
						display: isCreateNote ? "none" : "block",
						marginBottom: 10,
					}}
				>
					<span className="mr-1">Create note at </span>{" "}
					<span className="font-bold">
						{formatTime(time?.toString())}
					</span>
				</Button>
			</div>
		</div>
	);
}
