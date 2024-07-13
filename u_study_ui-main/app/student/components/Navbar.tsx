"use client";
import React from "react";
import { useRouter } from "next/navigation";

// icons
import {
	AppstoreOutlined,
	ContainerOutlined,
	DesktopOutlined,
	SettingOutlined,
	LogoutOutlined,
	CalendarOutlined,
} from "@ant-design/icons";

// antd
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useLocalStorage } from "@/lib/customHook/useLocalStorage";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: "group"
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem;
}

const items: MenuItem[] = [
	getItem("Courses", "1", <AppstoreOutlined />),
	getItem("My Courses", "2", <DesktopOutlined />),
	getItem("My Notebook", "3", <ContainerOutlined />),
	getItem("Schedule", "4", <CalendarOutlined />),
	getItem("Option", "5", <SettingOutlined />, [
		getItem(
			<p className="text-red-500">Logout</p>,
			"51",
			<LogoutOutlined style={{ color: "red" }} />
		),
	]),

	// getItem("Navigation One", "sub1", <MailOutlined />, [
	// 	getItem("Option 5", "5"),
	// 	getItem("Option 6", "6"),
	// 	getItem("Option 7", "7"),
	// 	getItem("Option 8", "8"),
	// ]),

	// getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
	// 	getItem("Option 9", "9"),
	// 	getItem("Option 10", "10"),

	// 	getItem("Submenu", "sub3", null, [
	// 		getItem("Option 11", "11"),
	// 		getItem("Option 12", "12"),
	// 	]),
	// ]),
];

const Navbar: React.FC = () => {
	const accessToken = useLocalStorage("access_token");
	const userInfo = useLocalStorage("user_info");
	const router = useRouter();
	const handleNav: MenuProps["onClick"] = (e) => {
		console.log(e);
		switch (e.key) {
			case "1":
				router.push("/student/courses");
				break;
			case "2":
				router.push("/student/mycourses");
				break;
			case "3":
				router.push("/student/notebook");
				break;
			case "4":
				router.push("/student/schedule");
				break;
			case "51":
				console.log("logout");
				accessToken.removeItem();
				userInfo.removeItem();
				router.push("/auth/login");
				break;
			default:
				break;
		}
	};

	return (
		<div style={{ width: 256 }}>
			<Menu
				style={{ width: 270 }}
				defaultSelectedKeys={["1"]}
				defaultOpenKeys={["sub1"]}
				mode="inline"
				theme="dark"
				items={items}
				onClick={handleNav}
			/>
		</div>
	);
};

export default Navbar;
