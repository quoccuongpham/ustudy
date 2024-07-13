"use client";

import Table from "antd/es/table";
import Tag from "antd/es/tag";

import type { TableData } from "./utils";

export default function ProfileCoursesSold({ data }: { data: TableData[] }) {
	return (
		<div>
			<Table
				dataSource={data}
				pagination={{
					pageSize: 5,
				}}
				rowKey={(record) => record.id}
				columns={[
					{
						title: "Course Name",
						dataIndex: "courseName",
						key: "courseName",
					},
					{
						title: "Price",
						dataIndex: "price",
						key: "price",
						render: (price: number) => (
							<span>
								{Intl.NumberFormat("vi-VN", {
									style: "currency",
									currency: "VND",
								}).format(price)}
							</span>
						),
					},
					{
						title: "Sold Date",
						dataIndex: "date",
						key: "date",
					},
					{
						title: "User Email",
						dataIndex: "userEmail",
						key: "userEmail",
					},
					{
						title: "Category",
						dataIndex: "category",
						key: "category",
						render: (category: string) => (
							<Tag color="cyan">{category}</Tag>
						),
					},
				]}
			/>
		</div>
	);
}
