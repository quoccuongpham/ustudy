"use client";
import { useState } from "react";

import Link from "next/link";

import { CourseWithDiscount, DiscountWithCourse } from "./page";

import { Table, Tag, Input, Button } from "antd";

export default function GenerateCoupon({
	coupon,
	courses,
}: {
	coupon: DiscountWithCourse[];
	courses: CourseWithDiscount[];
}) {
	const [filterCoupon, setFilterCoupon] = useState<DiscountWithCourse[]>(
		coupon.filter((data) => data.type === "WITH_COUPON")
	);

	const handleGenerateCoupon = async (formData: FormData) => {
		const data = {
			courseId: formData.get("courseId"),
			percentage: Number.parseInt(formData.get("percentage") as string),
			type: "WITH_COUPON",
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
			if (filterCoupon) {
				setFilterCoupon([...filterCoupon, resData]);
			} else {
				setFilterCoupon([resData]);
			}
		}
	};
	return (
		<div>
			<h1 className="text-lg font-bold">List Coupons</h1>
			<Table
				columns={[
					{
						title: "Course",
						dataIndex: "course",
						key: "course",
						render: (data: DiscountWithCourse) => (
							<Link
								href={`/teacher/courses/view/${data.courseId}`}
								className="font-bold"
							>
								{data.course.title}
							</Link>
						),
					},
					{
						title: "Coupon",
						dataIndex: "coupon",
						key: "coupon",
						render: (coupon: string) => (
							<Tag color="blue">{coupon}</Tag>
						),
					},
					{
						title: "Percentage",
						dataIndex: "percentage",
						key: "percentage",
						render: (percentage: number) => (
							<Tag color="red">-{percentage}%</Tag>
						),
					},
				]}
				dataSource={filterCoupon.map((data) => {
					return {
						key: data.id,
						course: data,
						coupon: data.coupon,
						percentage: data.percentage,
					};
				})}
				pagination={{ pageSize: 5, total: filterCoupon.length }}
			/>

			<div className="rounded-lg border-2 border-slate-300 p-5">
				<h2 className="text-lg font-bold mb-5">Generate Coupon</h2>
				<form action={handleGenerateCoupon} className="mb-10">
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
