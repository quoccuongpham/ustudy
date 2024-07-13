"use client";

import Button from "antd/es/button";
import message from "antd/es/message";

import { useEffect, useState } from "react";
export default function Cart({ data }: { data: Course | undefined }) {
	const [cart, setCart] = useState<Course[]>([]);
	useEffect(() => {
		let jsonCart = window.localStorage.getItem("cart");
		if (jsonCart) {
			setCart(JSON.parse(jsonCart));
		}
	}, []);

	const [messageApi, contextHolder] = message.useMessage();

	const addToCart = () => {
		messageApi.open({
			type: "success",
			content: "Add to cart successfully!",
		});
		if (data) {
			setCart([...cart, data]);
			window.localStorage.setItem(
				"cart",
				JSON.stringify([...cart, data])
			);
		}
	};
	console.log(cart);

	return (
		<>
			{contextHolder}
			<Button
				size="large"
				className="w-40 h-10"
				onClick={addToCart}
				disabled={cart.some((item) => item.id === data?.id)}
			>
				Add to cart
			</Button>
		</>
	);
}
