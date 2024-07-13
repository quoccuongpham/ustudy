"use client";
import React from "react";
import { useState } from "react";

import CourseNav from "./CourseNav";
import Note from "./note/Note";
import Question from "./Question/Question";
import Resourse from "./Resourse";
import Review from "./review/Review";
import Search from "./search/search";

import { useVideoStore } from "@/lib/zustand/store";

export default function CourseUnity() {
	const video = useVideoStore((state) => state.video);
	const [navActive, setNavActive] = useState(1);
	const handleNav = (key: number) => {
		setNavActive(key);
	};
	let content = <>content</>;

	switch (navActive) {
		case 1:
			content = <Note />;
			break;
		case 2:
			content = <Question />;
			break;
		case 3:
			content = <Resourse />;
			break;
		case 4:
			content = <Review />;
			break;
		case 5:
			content = <Search />;
			break;
		default:
			break;
	}

	return (
		<div className="min-h-60 ">
			<CourseNav handleNav={handleNav} active={navActive} />
			<div className="mt-2 bg-white rounded-md min-h-screen">
				{content}
			</div>
		</div>
	);
}
