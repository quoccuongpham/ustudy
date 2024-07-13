"use client";
import { useState } from "react";

import { Button, Input, Tag, message } from "antd";

export default function CheckCoupon({
	courseId,
	handleSetCoupon,
}: {
	courseId: number;
	handleSetCoupon: Function;
}) {
	const [couponCheck, setCouponCheck] = useState<Discount | null>(null);
	const [messageApi, contextHolder] = message.useMessage();
	const handleCheckCoupon = async (formData: FormData) => {
		const coupon = formData.get("coupon");
		try {
			const res = await fetch(
				`http://localhost:3001/discount/check?courseId=${courseId}&coupon=${coupon}`
			);

			if (res.ok) {
				let data = await res.json();
				if (!data) {
				} else {
					setCouponCheck(data);
					handleSetCoupon(data);
				}
			}
		} catch (error) {
			setCouponCheck(null);
			handleSetCoupon(null);
			messageApi.open({
				type: "error",
				content: "Coupon not found",
			});
			console.log(error);
		}
	};
	console.log(couponCheck);
	return (
		<div className="px-3">
			{contextHolder}
			<form action={handleCheckCoupon}>
				<Input
					placeholder="Enter your coupon"
					className="w-full p-3"
					maxLength={15}
					name="coupon"
				/>
				{couponCheck && (
					<Tag style={{ marginTop: "10px" }} color="cyan">
						Apply:{" "}
						<span className="font-bold">{couponCheck.coupon}</span>
						<span className="text-red-500 font-bold ml-3">
							-{couponCheck.percentage}%
						</span>
					</Tag>
				)}
				<br />
				<Button className="my-3 block" htmlType="submit">
					Check
				</Button>
			</form>
		</div>
	);
}
