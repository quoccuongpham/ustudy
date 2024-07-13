"use client";
import Image from "next/image";
import { Modal, Tabs, Input } from "antd";
import Avatar from "antd/es/avatar";
import { useEffect, useState } from "react";

import { handleUpdateAvatar } from "./utils";
export default function ProfilePage() {
	const [userData, setUserData] = useState<{
		uuid: string;
		name: string;
		email: string;
		role: string;
		avatarUrl: string;
		balance: number;
	}>();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const userInfo = localStorage.getItem("user_info");
		if (userInfo) {
			setUserData(JSON.parse(userInfo));
		}
	}, []);
	const renderAccount = (
		<>
			<div className="flex ml-5">
				<Avatar
					size={100}
					src={userData?.avatarUrl ?? "/images/avatars/avatar_2.jpg"}
					className="hover:cursor-pointer hover:opacity-80"
					onClick={() => setOpen(true)}
				>
					H
				</Avatar>
				<div className="ml-5">
					<h2 className="font-bold mb-2">
						{userData?.name.toString().toUpperCase()}
					</h2>
					<p className="mb-2 italic">{userData?.email}</p>
					<p>{userData?.role}</p>
				</div>
			</div>
			<Modal
				title="Choose your avatar"
				open={open}
				onOk={() => setOpen(false)}
				onCancel={() => setOpen(false)}
				footer={false}
				closeIcon={false}
				width={600}
			>
				<div className="flex flex-wrap gap-3">
					{Array.from({ length: 25 }, (_, i) => i + 1).map((i) => (
						<Image
							width={80}
							height={80}
							priority
							src={`http://localhost:3001/images/avatars/avatar_${i}.jpg`}
							alt={`avatar ${i}`}
							key={i}
							className="rounded-lg hover:cursor-pointer hover:shadow-md hover:opacity-80"
							onClick={async () => {
								const res = await handleUpdateAvatar(
									`http://localhost:3001/images/avatars/avatar_${i}.jpg`,
									userData?.uuid!
								);

								console.log(res);

								localStorage.setItem(
									"user_info",
									JSON.stringify({
										...userData,
										avatarUrl: `http://localhost:3001/images/avatars/avatar_${i}.jpg`,
									})
								);

								setUserData(
									JSON.parse(
										localStorage.getItem("user_info")!
									)
								);

								setOpen(false);
							}}
						/>
					))}
				</div>
			</Modal>

			<p className="mt-5 font-bold">Change Profile</p>
			<form action="#" className="grid grid-cols-3 gap-5">
				<div>
					<label htmlFor="name" className="font-bold mt-3 block">
						Name:
					</label>
					<Input
						name="name"
						id="name"
						defaultValue={userData?.name}
					/>
				</div>
				<div>
					<label htmlFor="area" className="font-bold mt-3 block">
						Area:
					</label>
					<Input name="area" id="area" defaultValue={"ASIA"} />
				</div>
			</form>
		</>
	);
	return (
		<div className="p-5">
			<h1 className="text-lg font-bold">Profile</h1>
			<div className="min-h-[calc(100vh-140px)] bg-white rounded-md mt-3 p-5">
				<Tabs
					tabPosition="left"
					items={[
						{
							key: "1",
							label: "Account",
							children: renderAccount,
						},
					]}
				/>
			</div>
		</div>
	);
}
