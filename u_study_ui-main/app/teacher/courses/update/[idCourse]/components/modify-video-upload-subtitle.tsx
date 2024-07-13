"use client";
import type { UploadProps } from "antd";

import Upload from "antd/es/upload";
import Button from "antd/es/button";
import message from "antd/es/message";
import { UploadOutlined, TranslationOutlined } from "@ant-design/icons";
export default function ModifyVideoUploadSubtitle({
	idVideo,
}: {
	idVideo: number;
}) {
	const props: UploadProps = {
		name: "file",
		action: "http://localhost:3001/subtitle/upload",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("access_token")}`,
		},
		data: { idVideo: idVideo },
		accept: ".vtt",
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
		<>
			<Upload {...props}>
				<Button icon={<TranslationOutlined />}>Upload Subtitle</Button>
			</Upload>
		</>
	);
}
