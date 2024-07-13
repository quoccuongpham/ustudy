"use client";
import { useState, useEffect } from "react";

import Image from "next/image";

import { useDrawerNavStore } from "@/lib/zustand/store";
// icons
import { MenuOutlined, ShoppingCartOutlined } from "@ant-design/icons";

// antd
import Search from "antd/es/input/Search";
import Popover from "antd/es/popover";
import Button from "antd/es/button";
import { formaterVND } from "@/lib/utils/formatCurrency";

export default function Header() {
	const [cart, setCart] = useState<Course[]>([]);

	const setOpenDrawer = useDrawerNavStore((state) => state.setOpen);

	useEffect(() => {
		let jsonCart = window.localStorage.getItem("cart");
		if (jsonCart) {
			setCart(JSON.parse(jsonCart));
		}
	}, []);

	console.log(cart);

	const cartContent = (
		<div className="mr-5">
			{cart?.map((item) => {
				return (
					<div
						className="flex justify-between items-start gap-2 mb-2 hover:cursor-pointer hover:bg-slate-100 p-3"
						key={item.id}
					>
						<div className="w-40">
							<Image
								src={item.image}
								alt={item.title}
								width={500}
								height={500}
								// className="w-40"
								priority
							/>
						</div>

						<p className="text-ellipsis whitespace-nowrap overflow-hidden">
							{item.title}
						</p>
						<p className="font-bold">
							{formaterVND.format(item.price)}
						</p>
					</div>
				);
			})}

			<div className="text-right">
				<Button type="primary">Payment</Button>
			</div>
		</div>
	);
	return (
		<div className="flex items-center h-full gap-5 justify-between">
			<button
				className="text-lg"
				onClick={() => {
					setOpenDrawer(true);
				}}
			>
				<MenuOutlined />
			</button>
			<Search
				placeholder="Search courses"
				style={{ width: 500 }}
				size="large"
			></Search>
			<div className="hover:text-colormain hover:cursor-pointer mr-5">
				<Popover
					content={cartContent}
					title="Cart"
					style={{ width: 1500 }}
				>
					<ShoppingCartOutlined style={{ fontSize: "20px" }} />
				</Popover>
			</div>
		</div>
	);
}
