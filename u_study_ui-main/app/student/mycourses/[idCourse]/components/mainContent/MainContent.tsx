"use client";
import { useVideoStore, useCourseStore } from "@/lib/zustand/store";
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { FiList } from "react-icons/fi";

import ReactPlayer from "react-player";
import Drawer from "antd/es/drawer";
import Button from "antd/es/button";

import CourseUnity from "../CourseUnity";
import RightSideBar from "../rightSidebar/RightSideBar";

export default function MainContent({ course }: { course: Course }) {
	const [isOpenRightDrawer, setIsOpenRightDrawer] = useState(false);
	const setVideo = useVideoStore((state) => state.setVideo);
	const setRef = useVideoStore((state) => state.setRef);
	const setTime = useVideoStore((state) => state.setTime);
	const setCourseStore = useCourseStore((state) => state.setCourse);
	const video = useVideoStore((state) => state.video);
	const [socket, setSocket] = useState<Socket>();
	const [timeStamp, setTimeStamp] = useState<number | null>(null);
	const [hasWindow, setHasWindow] = useState(false);
	const playerRef = useRef<ReactPlayer | null>(null);
	const wraperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setVideo(course.chapters[0].videos[0]);
	}, [course.chapters, setVideo]);
	// check window
	useEffect(() => {
		if (typeof window !== "undefined") {
			setHasWindow(true);
		}
	}, []);
	// set course store
	useEffect(() => {
		setCourseStore(course);
	}, [course, setCourseStore]);
	useEffect(() => {
		const connect = io("http://localhost:3003", {
			auth: {
				token: localStorage.getItem("access_token"),
			},
		});
		setSocket(connect);
		connect.on("connected", (args) => {
			console.log("Socket on Maincontent Connected:::", args);
		});
		return () => {
			connect.disconnect();
		};
	}, []);

	// get time watched
	useEffect(() => {
		fetch(`/api/student/mycourses/learning/${video?.id}`)
			.then((res) => res.json())
			.then((learning) => setTimeStamp(learning.timeLearned))
			.catch((err) => console.log(err));
	}, [video?.id]);

	useEffect(() => {
		setRef(playerRef);
	}, [playerRef, setRef]);

	return (
		<div ref={wraperRef}>
			{/* for large sceen */}
			<div className="aspect-video bg-white mt-3 rounded-md player-wrapper">
				<div className="player-wrapper hidden lg:block">
					{hasWindow && (
						<ReactPlayer
							ref={playerRef}
							className="react-player"
							url={`http://localhost:3002/video/stream/${video?.id}`}
							width={925.5}
							height={520.59}
							style={{
								borderRadius: "10px",
							}}
							config={{
								file: {
									attributes: {
										crossOrigin: "true",
									},
									tracks: [
										{
											kind: "subtitles",
											label: "English",
											srcLang: "en",
											src: `http://localhost:3001/subtitle/${video?.id}`,
											default: true,
										},
									],
								},
							}}
							// width={"auto"}
							// height={"auto"}
							progressInterval={1000}
							controls
							onProgress={() => {
								socket?.emit("leanrning_timestamp", {
									videoId: video?.id,
									timeLearned: Math.floor(
										playerRef.current?.getCurrentTime() ?? 0
									),
									completed:
										Math.floor(
											Number.parseInt(
												video?.duration ?? "0"
											)
										) -
											Math.floor(
												playerRef.current?.getCurrentTime() ??
													0
											) <=
										30,
								});
								setTime(
									playerRef.current?.getCurrentTime() ?? 0
								);
							}}
							onPlay={() => {}}
							onStart={() => {
								playerRef.current?.seekTo(timeStamp ?? 0);
							}}
							onSeek={() => {
								wraperRef.current?.scrollIntoView();
							}}
						/>
					)}
				</div>
			</div>
			<div className="pt-5">
				<CourseUnity />
			</div>

			{/* Mobile */}
			<div className="absolute bottom-0 bg-gray-200 w-full left-0 h-14 flex items-center justify-between lg:hidden p-3 pr-10 pl-10 ">
				<div
					className="bg-white p-2 rounded-md cursor-pointer hover:text-colormain border border-transparent hover:border-colormain box-border transition-all duration-300 ease-in-out"
					onClick={() => {
						setIsOpenRightDrawer(true);
					}}
				>
					<FiList size={20} />
				</div>
				<div className="text-center">
					<p className="font-bold">{video?.title}</p>
				</div>
				<div className="flex gap-5 justify-end">
					<Button className="block">Previous</Button>
					<Button className="block">Next</Button>
				</div>
			</div>
			<Drawer
				title="Content"
				open={isOpenRightDrawer}
				closable
				onClose={() => {
					setIsOpenRightDrawer(false);
				}}
			>
				<RightSideBar course={course} />
			</Drawer>
		</div>
	);
}
