"use client";
import React, { useEffect, useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Input, Button, Divider } from "antd";
import BreadcrumbCustom from "@/app/components/BreadcrumbCustom";
import paymentFetch, { PaymentForm } from "@/lib/student/payment.fetch";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";

import getDataCourse from "@/lib/student/getDataCourse";

import { formaterVND } from "@/lib/utils/formatCurrency";

import PaymentDetailPrice from "./payment-detail-price";

type Props = {
	params: {
		idCourse: string;
	};
};

export default function Payment({ params: { idCourse } }: Props) {
	const searchParams = useSearchParams();

	const [course, setCourse] = useState<Course>();
	const [discount, setDiscount] = useState<Discount | null>(null);
	const path: {
		href: string;
		title: JSX.Element | string;
	}[] = [
		{
			href: "",
			title: (
				<p className="text-colormain font-bold">
					<HomeOutlined />
				</p>
			),
		},
		{
			href: "/student/courses",
			title: <p className="text-colormain font-bold">Courses</p>,
		},
		{
			href: "/student/courses",
			title: <p className="text-colormain font-bold">Payment</p>,
		},
		{
			href: `/student/courses/${idCourse}`,
			title: `${idCourse}`,
		},
	];
	const router = useRouter();
	useEffect(() => {
		getDataCourse(+idCourse).then((val) => {
			setCourse(val);
		});
	}, [idCourse]);

	useEffect(() => {
		fetch(
			`http://localhost:3001/discount/check?courseId=${idCourse}&coupon=${searchParams.get(
				"coupon"
			)}`
		)
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
			})
			.then((val) => setDiscount(val))
			.catch((err) => console.log(err));
	}, [idCourse, searchParams]);

	return (
		<div className="p-5">
			<BreadcrumbCustom path={path} />
			<section className="mt-3 bg-white rounded-lg grid grid-cols-3">
				<div className="col-span-2 pt-10 pb-10">
					<h2 className="text-lg font-bold text-center">Payment</h2>

					<form
						className="px-5 grid grid-cols-3 gap-y-5 gap-x-5 mt-5"
						action={async (data) => {
							try {
								const formData: PaymentForm = {
									...Object.fromEntries(data),
									id_course: +idCourse,
								} as PaymentForm;
								const res = await paymentFetch(formData);

								Swal.fire({
									title: "Success",
									text: "Payment for course successfuly",
									icon: "success",
									confirmButtonText: "OK",
								}).then((val) => {
									router.push("/student/mycourses");
								});
							} catch (error) {
								Swal.fire({
									title: "Success",
									text: "Payment for course successfuly",
									icon: "success",
									confirmButtonText: "OK",
								});
							}
						}}
					>
						<div className="col-span-3">
							<label>Name</label>
							<Input
								size="large"
								placeholder="Name"
								name="name"
								autoFocus
								required
							/>
						</div>
						<div className="">
							<label>Card number</label>
							<Input
								size="large"
								type="text"
								placeholder="Card Number"
								name="card_number"
								required
							/>
						</div>
						<div className="">
							<label>Date Expiration</label>
							<Input
								size="large"
								type="date"
								placeholder="Expiration"
								name="expiration"
								required
							/>
						</div>
						<div className="">
							<label>CVV</label>
							<Input
								size="large"
								placeholder="CVV"
								name="cvv"
								maxLength={3}
								required
							/>
						</div>
						<div className="col-span-2">
							<label>Email</label>
							<Input
								size="large"
								type="mail"
								placeholder="Email"
								name="email"
								required
							/>
						</div>
						<Button
							size="large"
							type="primary"
							htmlType="submit"
							className="col-span-3 w-1/2 mx-auto mt-5"
						>
							Done
						</Button>
					</form>
				</div>
				<div className="bg-colormain rounded-lg text-white col-span-1 pt-10 pb-10">
					<h2 className="text-lg font-bold text-center ">Detail</h2>
					<div className="mt-5 p-10">
						<PaymentDetailPrice
							title={course?.title ?? ""}
							price={formaterVND.format(course?.price || 0)}
						/>
						{discount && (
							<PaymentDetailPrice
								title="Discount"
								price={`${discount?.percentage}%`}
							/>
						)}
						{/* <PaymentDetailPrice title="VAT" price="10%" /> */}
						<Divider style={{ borderColor: "white" }} />
						{(course?.price && discount?.percentage && (
							<PaymentDetailPrice
								title="Total"
								price={formaterVND.format(
									(course.price *
										(100 - discount.percentage)) /
										100
								)}
							/>
						)) || (
							<PaymentDetailPrice
								title="Total"
								price={formaterVND.format(course?.price || "0")}
							/>
						)}
					</div>
				</div>
			</section>
		</div>
	);
}
