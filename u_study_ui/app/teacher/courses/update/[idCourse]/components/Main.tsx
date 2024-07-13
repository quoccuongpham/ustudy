"use client";
import React, { useState, useRef, useEffect } from "react";
import Button from "antd/es/button";
import Modal from "antd/es/modal/Modal";
import {
	message,
	Input,
	Tree,
	TreeDataNode,
	Upload,
	UploadProps,
	TreeProps,
} from "antd";
import { FolderAddOutlined, InboxOutlined } from "@ant-design/icons";
import createChapter from "@/lib/teacher/createChapter";
import { UploadRef } from "antd/es/upload/Upload";
const { Dragger } = Upload;
import { useRouter } from "next/navigation";
import ModifyVideo from "./ModifyVideo";
export default function Main({
	course,
	handleRefresh,
}: {
	course: Course;
	handleRefresh: () => void;
}) {
	const router = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalMenuOpen, setIsModalMenuOpen] = useState(false);
	const [isModalModifyVideo, setIsModalModifyVideo] = useState(false);
	const [titleModalUpload, setTitleModalUpload] = useState("");

	const [tData, setTData] = useState<TreeDataNode[]>([]);

	const duration = useRef<number>(0);
	// const [duration, setDuration] = useState<number>(0);
	const selectedChapter = useRef<number | null>(null);
	const selectedVideo = useRef<number | null>(null);
	const uploadRef = useRef<UploadRef>(null);
	const formRef = useRef<HTMLFormElement | null>(null);
	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		formRef.current?.requestSubmit();
		formRef.current?.reset();
	};

	const handleCreateChapter = async (data: FormData) => {
		try {
			const formData: {
				title: string;
			} = Object.fromEntries(data) as {
				title: string;
			};
			const res: Chapter = await createChapter({
				...formData,
				courseId: course.id,
			});

			if (res) {
				// course.chapters.push({
				// 	...res,
				// 	courseId: course.id,
				// 	videos: [],
				// });
				setTData([
					...tData,
					{
						key: res.id,
						title: res.title,
					},
				]);
			}
			setIsModalOpen(false);
		} catch (error) {
			message.error("Error");
		}
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const props: UploadProps = {
		name: "file",
		multiple: true,
		action: "http://localhost:3002/video/upload",
		// action: "https://run.mocky.io/v3/373cd083-0091-47e7-85dd-c619b58d46fa",
		headers: {
			authorization: `Bearer ${localStorage.getItem("access_token")}`,
		},
		beforeUpload(file) {
			const isVideo = file.type.startsWith("video/");
			if (file) {
				const video = document.createElement("video");
				video.src = URL.createObjectURL(file);
				video.onloadeddata = function () {
					duration.current = video.duration;
				};
			}
			if (!isVideo) {
				message.error("Chỉ tải lên video!");
				return false;
			}
			return isVideo;
		},
		data: (file) => {
			let time_vi = 0;
			if (file.originFileObj) {
				const video = document.createElement("video");
				video.src = URL.createObjectURL(file.originFileObj);
				video.onloadeddata = function () {
					// duration.current = video.duration;
					time_vi = video.duration;
					console.log(video.duration);
				};
			}
			return {
				courseId: course.id,
				chapterId: selectedChapter.current,
				duration: time_vi,
			};
		},
		onChange(info) {
			const { status } = info.file;
			if (status !== "uploading") {
				// console.log(info.file, info.fileList);
			}
			if (status === "done") {
				message.success(
					`${info.file.name} file uploaded successfully.`
				);

				fetch(`http://localhost:3002/video/${info.file.response.id}`, {
					method: "PATCH",
					body: JSON.stringify({
						duration: Math.round(duration.current),
					}),
					headers: {
						"Content-Type": "application/json",
					},
				})
					.then((res) => {
						console.log(res);
						if (res.ok) {
							console.log("update success");
						}
					})
					.catch((err) => {
						console.log(err);
					});
			} else if (status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		},

		onDrop(e) {
			console.log("Dropped files", e.dataTransfer.files);
		},
	};

	useEffect(() => {
		setTData(
			course.chapters.map((el) => {
				const children: TreeDataNode[] | null = el.videos.map((vi) => {
					return {
						key: `${el.id}-${vi.id}`,
						title: `${vi.title}`,
						style: {
							color: vi.hidden ? "red" : "inherit",
						},
					};
				});

				return {
					key: el.id,
					title: el.title,
					children: children,
				};
			})
		);
	}, [course]);

	const onDragEnter: TreeProps["onDragEnter"] = (info) => {
		// console.log(info);
		//
	};

	const onDrop: TreeProps["onDrop"] = (info) => {
		const dropKey = info.node.key;
		const dragKey = info.dragNode.key;
		const dropPos = info.node.pos.split("-");
		const dropPosition =
			info.dropPosition - Number(dropPos[dropPos.length - 1]);

		console.log(dropKey, dragKey, dropPosition);

		const loop = (
			data: TreeDataNode[],
			key: React.Key,
			callback: (
				node: TreeDataNode,
				i: number,
				data: TreeDataNode[]
			) => void
		) => {
			for (let i = 0; i < data.length; i++) {
				if (data[i].key === key) {
					return callback(data[i], i, data);
				}
				if (data[i].children) {
					loop(data[i].children!, key, callback);
				}
			}
		};
		const data = [...tData];

		// find dragObject
		let dragObj: TreeDataNode;
		loop(data, dragKey, (item, index, arr) => {
			arr.splice(index, 1);
			dragObj = item;
		});

		if (!info.dropToGap) {
			// Drop on the content
			loop(data, dropKey, (item) => {
				item.children = item.children || [];
				// where to insert. New item was inserted to the start of the array in this example, but can be anywhere
				item.children.unshift(dragObj);
			});
		} else {
			let ar: TreeDataNode[] = [];
			let i: number;
			loop(data, dropKey, (_item, index, arr) => {
				ar = arr;
				i = index;
			});
			if (dropPosition === -1) {
				// Drop on the top of the drop node
				ar.splice(i!, 0, dragObj!);
			} else {
				// Drop on the bottom of the drop node
				ar.splice(i! + 1, 0, dragObj!);
			}
		}
		setTData(data);

		let _seq = 0;
		let sequence = data.map((_chapter, _chapter_index) => {
			return _chapter?.children?.map((_video) => {
				_seq++;
				return {
					id: Number(_video.key.toString().split("-")[1]),
					sequence: _seq,
					chapter: Number(_chapter.key),
					chapter_sequence: _chapter_index,
				};
			});
		});
		const sequenceFlat = sequence.flat();
		console.log(sequenceFlat);

		if (
			sequenceFlat.some(
				(value) => Boolean(value?.id) == false || value === undefined
			)
		) {
			return;
		}
		fetch(`/api/teacher/courses/${course.id}/arrange`, {
			method: "POST",
			body: JSON.stringify(sequenceFlat),
		})
			.then((res) => res.json())
			.then((d) => console.log(d));
	};

	return (
		<div className="bg-white w-full">
			<h2 className=" text-lg font-bold mb-3">{course.title}</h2>
			<div className="text-left">
				<Button
					icon={<FolderAddOutlined />}
					type="primary"
					onClick={() => {
						showModal();
					}}
				>
					Add Chapter
				</Button>
			</div>
			<Modal
				title="Create chapter"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<form action={handleCreateChapter} ref={formRef}>
					<label htmlFor="title" className="font-bold text-gray-500">
						Chapter name:
					</label>
					<Input
						name="title"
						placeholder="Chapter name"
						autoFocus
						id="title"
						onKeyDown={(e) => {
							if (e.code === "Enter") {
								e.preventDefault();
							}
						}}
					/>
				</form>
			</Modal>
			<div className="mt-5">
				<Tree
					treeData={tData}
					draggable
					blockNode
					onSelect={(selectedKeysValue: React.Key[], info) => {
						if (info.node.key.toString().split("-").length == 1) {
							setIsModalMenuOpen(true);
							setTitleModalUpload(info.node.title as string);
							selectedChapter.current = info.node.key as number;
							console.log(selectedChapter.current);
						} else {
							selectedVideo.current = +selectedKeysValue
								.toString()
								.split("-")[1];
							setIsModalModifyVideo(true);
						}
					}}
					onDragEnter={onDragEnter}
					onDrop={onDrop}
					showLine
				/>
				{/* Modal upload video */}
				<Modal
					title={titleModalUpload}
					open={isModalMenuOpen}
					onCancel={() => {
						setIsModalMenuOpen(false);
					}}
					onOk={() => {
						setIsModalMenuOpen(false);
						handleRefresh();
					}}
					closeIcon={false}
					destroyOnClose={true}
				>
					<Dragger
						{...props}
						ref={uploadRef}
						// style={{ maxHeight: "200px", overflow: "scroll" }}
					>
						<p className="ant-upload-drag-icon">
							<InboxOutlined />
						</p>
						<p className="ant-upload-text">
							Click or drag file to this area to upload
						</p>
						<p className="ant-upload-hint">
							Support for a single or bulk upload. Strictly
							prohibited from uploading company data or other
							banned files.
						</p>
					</Dragger>
				</Modal>
				{/* Modal modify video */}
				<Modal
					open={isModalModifyVideo}
					closable
					footer={false}
					onCancel={() => {
						setIsModalModifyVideo(false);
					}}
				>
					<ModifyVideo id={selectedVideo.current} />
				</Modal>
			</div>
		</div>
	);
}
