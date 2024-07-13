"use client";
import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { formaterVND } from "@/lib/utils/formatCurrency";

import Cart from "./add-to-cart";
import CheckCoupon from "./check-coupon";
import { getDiscount } from "@/lib/student/course/getDiscount";

export default function RightMenu({ dataCourse }: { dataCourse: Course }) {
	const [couponCheck, setCouponCheck] = useState<Discount | null>(null);

	const [discount, setDiscount] = useState<Discount | null>(null);

	useEffect(() => {
		const get = async () => {
			try {
				const discount = await getDiscount(dataCourse.id);
				if (discount) {
					setDiscount(discount);
				}
			} catch (error) {}
		};
		get();
	}, [dataCourse.id]);
	return (
		<div className="h-fit w-full bg-white rounded-lg">
			<Image
				src={dataCourse.image}
				alt={dataCourse.title}
				width={2000}
				height={2000}
				priority={true}
				className="w-full rounded-md"
			></Image>
			<h2
				className={
					"text-xl font-bold px-3 mt-5" +
					(couponCheck || discount ? " line-through" : "")
				}
			>
				{formaterVND.format(dataCourse.price)}
			</h2>
			{couponCheck && (
				<h2 className="text-xl font-bold px-3 text-red-500">
					{formaterVND.format(
						(dataCourse.price * (100 - couponCheck.percentage)) /
							100
					)}
				</h2>
			)}

			{!couponCheck && discount && (
				<h2 className="text-xl font-bold px-3 text-red-500">
					{formaterVND.format(
						(dataCourse.price * (100 - discount.percentage)) / 100
					)}
				</h2>
			)}

			<div className="flex justify-between p-3">
				<Link
					href={`/student/courses/payment/${dataCourse.id}?coupon=${couponCheck?.coupon}`}
				>
					<button className="w-40 h-10 rounded-md bg-colormain text-white font-bold hover:bg-colormain/80">
						Erroll course
					</button>
				</Link>
				<Cart data={dataCourse} />
			</div>

			<p className="text-colormain font-bold p-3">Did you have coupon?</p>
			<CheckCoupon
				courseId={+dataCourse.id}
				handleSetCoupon={setCouponCheck}
			/>
		</div>
	);
}
