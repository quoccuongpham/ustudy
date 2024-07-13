import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
// antd
import Layout from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Header } from "antd/es/layout/layout";
import { Content } from "antd/es/layout/layout";

// components
import Navbar from "./components/NavBar";
import UserInfo from "./components/UserInfo";
import HeaderComponent from "./components/Header";
import DrawerNavTeacher from "../components/DrawerNavTeacher";

export const metadata: Metadata = {
	title: "U Study App",
	description: "Courses, take note and share document",
};
export default function TeacherLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Layout>
			<Sider
				width={270}
				style={{
					backgroundColor: "#031f31",
					color: "#f7f8fa",
					minHeight: "100vh",
				}}
				className="hidden lg:block"
			>
				{/* HEADER */}
				<div className="px-3 mb-5">
					<Link
						href={"/"}
						className="text-inherit hover:text-inherit"
					>
						<div className="font-bold text-xl pt-2 pb-6 ">
							<span className="text-colormain">U</span>-Study.
						</div>
					</Link>
					<UserInfo />
				</div>
				{/* NAV */}
				<Navbar />
			</Sider>
			<DrawerNavTeacher />
			<Layout>
				<Header style={{ backgroundColor: "#f7f8fa", height: 60 }}>
					<HeaderComponent />
				</Header>
				<Content
					style={{ backgroundColor: "#e3e8ef", overflowY: "scroll" }}
					className="no-scrollbar"
				>
					{children}
				</Content>
			</Layout>
		</Layout>
	);
}
