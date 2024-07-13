import React from "react";
import { createContext } from "react";

export const VideoContext = createContext<{
	video: Video | null;
	setVideo: (data: Video) => void;
} | null>(null);

export default function VideoContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	let video: Video | null = null;
	function setVideo(data: Video) {
		video = data;
	}
	return (
		<VideoContext.Provider
			value={{
				video: video,
				setVideo: setVideo,
			}}
		>
			{children}
		</VideoContext.Provider>
	);
}
