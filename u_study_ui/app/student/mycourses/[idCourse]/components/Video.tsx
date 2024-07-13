"use client";
import React from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

export default function Video() {
	return (
		<Plyr
			source={{
				type: "video",
				sources: [
					{
						src: "http://localhost:3002/video/stream/17",
						provider: "html5",
					},
				],
			}}
			options={{
				previewThumbnails: {
					enabled: true,
					src: "https://elearningindustry.com/wp-content/uploads/2023/10/How-To-Create-An-Online-Course-Platform.jpg",
				},
			}}
		/>
	);
}
