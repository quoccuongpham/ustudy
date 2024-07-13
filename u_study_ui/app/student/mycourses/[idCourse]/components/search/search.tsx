"use client";
import { useState } from "react";
import { useFormState } from "react-dom";

import Input from "antd/es/input";
import Button from "antd/es/button";
import Tag from "antd/es/tag";

import { SearchOutlined } from "@ant-design/icons";

import { useVideoStore } from "@/lib/zustand/store";
import formatTime from "@/lib/utils/formatTime";
import useScrollToTop from "@/lib/hooks/use-scroll-to-top";

import { searchSubtitle } from "./actions";

type SearchSubtitle = {
	id: number;
	videoId: number;
	from: number;
	to: number;
	text: string;
};
const initialSearch: SearchSubtitle[] = [];

function highlightMatch(searchTerm: string, text: string) {
	const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const regex = new RegExp("\\b" + escapedTerm + "\\b", "gi");
	text = text.replace(
		regex,
		(m) => '<span class="bg-yellow-500 rounded">' + m + "</span>"
	);
	return text;
}
export default function Search() {
	const video = useVideoStore((state) => state.video);
	const playerRef = useVideoStore((state) => state.playerRef);
	const [searchText, setSearchText] = useState("");

	const [scrollToTop] = useScrollToTop();

	const [stateSearch, searchAction] = useFormState(
		searchSubtitle,
		initialSearch
	);

	console.log(stateSearch);
	return (
		<div className="p-5">
			<form action={searchAction}>
				<Input
					prefix={<SearchOutlined />}
					placeholder="Search in video"
					name="search"
					value={searchText}
					onChange={(e) => {
						setSearchText(e.target.value);
					}}
					className=""
				></Input>
				<input
					type="text"
					hidden
					value={video?.id}
					name="idVideo"
					width={0}
					readOnly
				/>
				<Button type="primary" htmlType="submit" className="mt-2">
					Search
				</Button>
			</form>

			{/* result of search */}
			{stateSearch.map((search: SearchSubtitle) => {
				return (
					<div
						key={search.id}
						onClick={() => {
							playerRef?.current?.seekTo(search.from / 1000);
						}}
						className="p-2 m-2 hover:cursor-pointer shadow-md"
					>
						<Tag color="blue">
							{formatTime((search.from / 1000).toString())}
						</Tag>
						<p
							className="mt-2"
							dangerouslySetInnerHTML={{
								__html: highlightMatch(searchText, search.text),
							}}
						></p>
					</div>
				);
			})}
		</div>
	);
}
