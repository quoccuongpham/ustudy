"use client";
import Drawer from "antd/es/drawer";

import { useDrawerNavStore } from "@/lib/zustand/store";
import Navbar from "../teacher/components/NavBar";
export default function DrawerNavTeacher() {
	const isOpen = useDrawerNavStore((state) => state.isOpen);
	const setOpen = useDrawerNavStore((state) => state.setOpen);
	return (
		<div>
			<Drawer
				placement="left"
				open={isOpen}
				closable
				onClose={() => {
					setOpen(false);
				}}
				width={270}
				style={{
					backgroundColor: "#031f31",
					color: "#f7f8fa",
					padding: "0px",
					margin: 0,
				}}
				styles={{
					body: {
						padding: 0,
					},
					header: {
						color: "#031f31",
					},
				}}
			>
				<Navbar />
			</Drawer>
		</div>
	);
}
