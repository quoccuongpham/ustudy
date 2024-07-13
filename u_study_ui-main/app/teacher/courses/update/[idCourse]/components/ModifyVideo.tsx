"use client";

import { useEffect, useState } from "react";

import { LockOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, UploadProps, Input } from "antd";

import { hidden_video } from "../actions";

import ModifyVideoUploadSubtitle from "./modify-video-upload-subtitle";

export default function ModifyVideo({ id }: { id: number | null }) {
	const [videoData, setVideoData] = useState<Video>();
	useEffect(() => {
		if (id) {
			fetch(`/api/teacher/video/${id}`)
				.then((res) => res.json())
				.then((data) => setVideoData(data));
		}
	}, [id]);
	const props: UploadProps = {
		name: "video",
		onChange(info) {
			if (info.file.status !== "uploading") {
				console.log(info.file, info.fileList);
			}
			if (info.file.status === "done") {
				message.success(`${info.file.name} file uploaded successfully`);
			} else if (info.file.status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
	};
	return (
		<div>
			<p className="font-bold">{videoData?.title}</p>
			<video
				src={`http://localhost:3002/video/stream/${id}`}
				controls
				className="mb-2 mt-3 rounded-md"
			></video>
			<div>
				<p className="font-bold">Title: </p>
				<form action="#" className="flex gap-5">
					<Input
						name="title"
						type="text"
						placeholder={videoData?.title}
					></Input>
					<Button type="primary">Save</Button>
				</form>
			</div>
			<div className="mt-3">
				<p className="font-bold">Modify: </p>
				<div className="flex gap-4 mt-3">
					<Upload {...props}>
						<Button icon={<UploadOutlined />}>Change</Button>
					</Upload>

					{id != null && <ModifyVideoUploadSubtitle idVideo={id} />}
					<Button
						danger
						icon={<LockOutlined />}
						onClick={() => {
							if (id) {
								hidden_video(id, true).then(() => {
									message.success("video hidden");
								});
							}
						}}
					>
						Hidden
					</Button>
				</div>
			</div>
		</div>
	);
}
