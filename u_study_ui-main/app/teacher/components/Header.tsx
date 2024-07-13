"use client";
import { useDrawerNavStore } from "@/lib/zustand/store";
// icons
import { MenuOutlined } from "@ant-design/icons";

// antd
import Search from "antd/es/input/Search";

export default function Header() {
	const setOpen = useDrawerNavStore((state) => state.setOpen);
	return (
		<div className="flex items-center h-full gap-5 justify-center sm:justify-start">
			<button className="text-lg" onClick={() => setOpen(true)}>
				<MenuOutlined />
			</button>
			<Search
				placeholder="Search courses"
				style={{ width: 300 }}
				size="large"
			></Search>
		</div>
	);
}
