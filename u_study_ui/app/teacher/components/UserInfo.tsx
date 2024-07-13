"use client";
import React, { useEffect, useState } from "react";
import Avatar from "antd/es/avatar/avatar";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
export default function UserInfo() {
	const [info, setInfo] = useState<{
		name: string;
		email: string;
		role: string;
		avatarUrl: string;
	} | null>();
	useEffect(() => {
		const userInfo = localStorage.getItem("user_info");
		if (userInfo) {
			setInfo(JSON.parse(userInfo));
		}
	}, []);
	return (
		<>
			<Link
				href={"/teacher/profile"}
				className="flex gap-3 items-center text-inherit"
			>
				<Avatar
					src={info?.avatarUrl ?? "/images/avatars/avatar_2.jpg"}
					style={{
						backgroundColor: "transparent",
						color: "cyan",
						// border: "solid #fff 1px",
					}}
				/>
				<div>
					<p className="font-bold">{info?.name}</p>
					<p className="text-gray-500 font-bold w-25 text-ellipsis overflow-hidden">
						{info?.email}
					</p>
				</div>
			</Link>
		</>
	);
}
