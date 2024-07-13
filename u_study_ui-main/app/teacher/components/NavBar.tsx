"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

// icons
import {
	AppstoreOutlined,
	ContainerOutlined,
	DesktopOutlined,
	SettingOutlined,
	LogoutOutlined,
} from "@ant-design/icons";

// antd
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
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
	getItem("My Courses", "1", <AppstoreOutlined />),
	getItem("Create Courses", "2", <DesktopOutlined />),
	getItem("Discount", "3", <ContainerOutlined />),
	getItem("Option", 4, <SettingOutlined />, [
		getItem(
			<p className="text-red-500">Logout</p>,
			41,
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
type PathKey = {
	[key: string]: string;
};
const Navbar: React.FC = () => {
	const pathname = usePathname();
	const accessToken = useLocalStorage("access_token");
	const userInfo = useLocalStorage("user_info");

	const pathKey: PathKey = {
		"/teacher/courses": "1",
		"/teacher/create": "2",
		"/teacher/discount": "3",
	};
	const router = useRouter();
	const handleNav: MenuProps["onClick"] = (e) => {
		console.log(e);
		switch (e.key) {
			case "1":
				router.push("/teacher/courses");
				break;
			case "2":
				router.push("/teacher/create");
				break;
			case "3":
				router.push("/teacher/discount");
				break;
			case "41":
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
				selectedKeys={[pathKey[pathname]]}
			/>
		</div>
	);
};

export default Navbar;
