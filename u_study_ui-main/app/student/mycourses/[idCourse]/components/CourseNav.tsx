"use client";
import { Button } from "antd";
import { CSSProperties } from "react";
import {
	FileTextOutlined,
	PaperClipOutlined,
	AliwangwangOutlined,
	QuestionOutlined,
	SearchOutlined,
} from "@ant-design/icons";
const buttonStyles: CSSProperties = {
	fontWeight: "bold",
	color: "darkgrey",
};

type Props = {
	handleNav: (key: number) => void;
	active: number;
};
export default function CourseNav({ handleNav, active }: Props) {
	return (
		<div className="flex justify-between items-center w-full overflow-x-scroll no-scrollbar">
			<div className="font-bold flex flex-1 gap-1">
				<Button
					icon={<FileTextOutlined />}
					size="middle"
					style={{
						...buttonStyles,
						color: active === 1 ? "#3cbea9" : "darkgrey",
					}}
					onClick={() => {
						handleNav(1);
					}}
				>
					Note
				</Button>
				<Button
					icon={<QuestionOutlined />}
					size="middle"
					style={{
						...buttonStyles,
						color: active === 2 ? "#3cbea9" : "darkgrey",
					}}
					onClick={() => {
						handleNav(2);
					}}
				>
					Questions
				</Button>
				<Button
					icon={<PaperClipOutlined />}
					size="middle"
					style={{
						...buttonStyles,
						color: active === 3 ? "#3cbea9" : "darkgrey",
					}}
					onClick={() => {
						handleNav(3);
					}}
				>
					Resources
				</Button>
				<Button
					icon={<AliwangwangOutlined />}
					size="middle"
					style={{
						...buttonStyles,
						color: active === 4 ? "#3cbea9" : "darkgrey",
					}}
					onClick={() => {
						handleNav(4);
					}}
				>
					Reviews
				</Button>
				<Button
					icon={<SearchOutlined />}
					size="middle"
					style={{
						...buttonStyles,
						color: active === 5 ? "#3cbea9" : "darkgrey",
					}}
					onClick={() => {
						handleNav(5);
					}}
				>
					Search
				</Button>
			</div>
			{/* <div className="mr-5">abc</div> */}
		</div>
	);
}
