"use client";
import { Table, Tag } from "antd";
import { PaymentTableData } from "./utils";
export default function Payment({ data }: { data: PaymentTableData[] }) {
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
						title: "Transaction id",
						dataIndex: "id",
						key: "id",
					},
					{
						title: "Amount",
						dataIndex: "amount",
						key: "amount",
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
						title: "Date",
						dataIndex: "date",
						key: "date",
					},
					{
						title: "Type",
						dataIndex: "type",
						key: "type",
					},
					{
						title: "Status",
						dataIndex: "status",
						key: "status",
						render: (status: string) => (
							<Tag
								color={
									status === "PENDING" ? "warning" : "success"
								}
							>
								{status}
							</Tag>
						),
					},
				]}
			/>
		</div>
	);
}
