"use client";
import { useState } from "react";

import Link from "next/link";

import type { CourseWithDiscount } from "./page";

import { Table, Tag, Input, Button, message } from "antd";

export default function DiscountCourse({
	courses,
}: {
	courses: CourseWithDiscount[];
}) {
	const [messageApi, contextHolder] = message.useMessage();
	const handleDiscountCourse = async (formData: FormData) => {
		const data = {
			courseId: formData.get("courseId"),
			percentage: Number.parseInt(formData.get("percentage") as string),
			type: "WITHOUT_COUPON",
			expiredAt: formData.get("expiredAt"),
		};

		const res = await fetch("http://localhost:3001/discount", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("access_token")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (res.ok) {
			const resData = await res.json();
			messageApi.open({
				type: "success",
				content: "Discount course successfully",
			});
		}
	};
	return (
		<div>
			{contextHolder}
			<h2 className="font-bold text-lg mb-5">Discount Course</h2>
			<Table
				pagination={{
					pageSize: 5,
					total: courses.length,
				}}
				columns={[
					{
						title: "Name",
						dataIndex: "name",
						key: "name",
						render: (course: CourseWithDiscount) => (
							<Link
								href={`/teacher/courses/view/${course.id}`}
								className="font-bold"
							>
								{course.title}
							</Link>
						),
					},
					{
						title: "Price",
						dataIndex: "price",
						key: "price",
						render: (price: number) => (
							<span className="font-semibold">
								{Intl.NumberFormat("vi-VN", {
									style: "currency",
									currency: "VND",
								}).format(price)}
							</span>
						),
					},
					{
						title: "Discount",
						key: "discount",
						dataIndex: "discount",
						render(discounts: Discount[]) {
							if (discounts.length === 0) return "";

							return discounts.map((discount) => {
								return discount.type === "WITHOUT_COUPON" ? (
									<Tag color="red" key={discount.id}>
										-{discount.percentage}%
									</Tag>
								) : (
									""
								);
							});
						},
					},
					{
						title: "Expire",
						dataIndex: "expiredAt",
						key: "expiredAt",
						render(discounts: Discount[]) {
							if (discounts?.length === 0) return "";
							if (discounts?.at(0)?.type === "WITH_COUPON")
								return "";
							try {
								return new Date(
									discounts?.at(0)?.expiredAt!
								).toLocaleDateString("vi-VN");
							} catch (error) {
								//
							}
						},
					},
					// {
					// 	title: "Action",
					// 	key: "action",
					// 	render(course) {
					// 		console.log(course);
					// 		return (
					// 			<Button
					// 				type="primary"
					// 				onClick={() => {
					// 					setDiscountModal(true);
					// 					setCourseSelect(course);
					// 				}}
					// 			>
					// 				Discount
					// 			</Button>
					// 		);
					// 	},
					// },
				]}
				dataSource={courses.map((course) => {
					return {
						key: course.id,
						name: course,
						price: course.price,
						discount: course.discounts,
						expiredAt: course.discounts,
						// action: course,
					};
				})}
			></Table>

			{/* <Modal
				title={"Discount: " + courseSelect?.title}
				open={discountModal}
				onCancel={() => {
					setDiscountModal(false);
					// setCourseSelect(null);
				}}
				footer={null}
			>
				<div>
					<form action={handleDiscountCourse}></form>
				</div>
			</Modal> */}

			<div className="rounded-lg border-2 border-slate-300 p-5">
				<h2 className="text-lg font-bold mb-5">Set Discount</h2>
				<form action={handleDiscountCourse} className="mb-10">
					<div className="mb-3">
						<label htmlFor="courseId" className="font-bold mr-5">
							Select course:
						</label>
						<select
							name="courseId"
							id="id"
							className="font-bold text-blue-500"
						>
							{courses.map((course) => {
								return (
									<option key={course.id} value={course.id}>
										{course.title}
									</option>
								);
							})}
						</select>
					</div>
					<div className="mb-3">
						<label htmlFor="courseId" className="font-bold mr-5">
							Percentage:
						</label>
						<Input
							type="number"
							name="percentage"
							id="percentage"
							style={{ width: "200px" }}
							suffix="%"
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="courseId" className="font-bold mr-5">
							Expired At:
						</label>
						<Input
							type="date"
							name="expiredAt"
							id="expiredAt"
							style={{ width: "200px" }}
						/>
					</div>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</form>
			</div>
		</div>
	);
}
