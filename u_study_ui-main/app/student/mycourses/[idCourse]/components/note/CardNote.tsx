import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import formatTime from "@/lib/utils/formatTime";
import { Tag, Button, Popconfirm, Modal } from "antd";
import { useVideoStore } from "@/lib/zustand/store";
import { useState } from "react";
import { FiEdit, FiTrash2, FiCheck } from "react-icons/fi";
import { CreateNoteData } from "@/app/api/student/mycourses/note/video/[idVideo]/route";

export const toolbarOptions = [
	[{ header: [1, 2, 3, 4, 5, 6, false] }],

	["bold", "italic", "underline", "strike"], // toggled buttons
	["blockquote", "code-block"],

	[{ header: 1 }, { header: 2 }], // custom button values
	[{ list: "ordered" }, { list: "bullet" }],
	[{ script: "sub" }, { script: "super" }], // superscript/subscript
	// [{ indent: "-1" }, { indent: "+1" }],
	[{ direction: "rtl" }], // text direction

	[{ size: ["small", "normal", "large", "huge"] }],

	[{ color: [] }, { background: [] }], // dropdown with defaults from theme
	[{ font: [] }],
	[{ align: [] }],

	["clean"], // remove formatting button
];

export default function CardNote({
	note,
	time = 0,
	active = false,
	deleteNote,
	handleEdit,
}: {
	note: Note;
	time?: number;
	active?: boolean;
	deleteNote: (id: number) => void;
	handleEdit: (id: number, noteEdited: Note) => void;
}) {
	const playerRef = useVideoStore((state) => state.playerRef);
	const [editData, setEditData] = useState<string>(note.content);
	const [isActive, setIsActive] = useState<boolean>(active);

	return (
		<div
			onClick={() => {
				playerRef?.current?.seekTo(time);
			}}
		>
			<div className="flex justify-between">
				<Tag
					color="cyan"
					style={{ marginBottom: 10, display: "inline-block" }}
				>
					{formatTime(time?.toString())}
				</Tag>
				<div>
					<Button
						size="small"
						icon={isActive ? <FiCheck /> : <FiEdit />}
						className="mr-2"
						type="primary"
						onClick={(e) => {
							e.stopPropagation();
							setIsActive(!isActive);
						}}
					></Button>
					<Popconfirm
						title="Delete this note"
						description="Are you sure to delete this note?"
						onCancel={() => {
							//
						}}
						onConfirm={() => {
							deleteNote(note.id);
							fetch(
								`/api/student/mycourses/note/video/${note.id}`,
								{
									method: "DELETE",
								}
							)
								.then((res) => {
									if (res.ok) {
										return res.json();
									}
								})
								.then((data) => {
									console.log("data:::", data);
								});
						}}
					>
						<Button
							danger
							size="small"
							icon={<FiTrash2 />}
							onClick={(e) => {
								e.stopPropagation();
							}}
						></Button>
					</Popconfirm>
				</div>
			</div>
			<div
				dangerouslySetInnerHTML={{
					__html: note.content ?? "<p></p>",
				}}
			></div>
			<Modal
				open={isActive}
				onCancel={() => setIsActive(false)}
				onOk={() => {
					fetch(`/api/student/mycourses/note/${note.id}`, {
						method: "PATCH",
						body: JSON.stringify({ content: editData }),
					})
						.then((res) => {
							if (res.ok) {
								return res.json();
							}
						})
						.then((data) => {
							console.log("data:::", data);
							handleEdit(note.id, data);
							setIsActive(false);
						});
				}}
				width={800}
				destroyOnClose
			>
				<ReactQuill
					theme="snow"
					onChange={(e, delta, source) => {
						setEditData(e);
					}}
					value={editData}
					modules={{ toolbar: toolbarOptions }}
				/>
			</Modal>
		</div>
	);
}
