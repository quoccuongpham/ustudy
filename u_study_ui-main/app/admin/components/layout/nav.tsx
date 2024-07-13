"use client";
import { useCallback, useState } from "react";
import NavButton from "./nav-button";

export default function Nav() {
	const [key, setKey] = useState<number>(1);
	const handleClick = useCallback((k: number) => {
		setKey(k);
	}, []);
	console.log(key);

	return (
		<div className="">
			<div className="mb-3">
				<NavButton
					title="Dashboard"
					active={1 === key}
					keyActive={1}
					onClick={handleClick}
				/>
			</div>
			<div className="mb-3">
				<NavButton
					title="Users"
					active={2 === key}
					keyActive={2}
					onClick={handleClick}
				/>
			</div>
			<div>
				<NavButton
					title="Courses"
					active={3 === key}
					keyActive={3}
					onClick={handleClick}
				/>
			</div>
		</div>
	);
}
