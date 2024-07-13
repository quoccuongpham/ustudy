"use client";
export type WithDrawData = {
	amount: number;
};
import { useState } from "react";

import Button from "antd/es/button";

import WithdrawModal from "./profile-withdraw-modal";
export default function ProfileWithdraw({ data }: { data: WithDrawData }) {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Button type="default" onClick={() => setOpen(true)}>
				Withdraw
			</Button>
			<WithdrawModal
				isVisible={open}
				data={data}
				onCancel={() => setOpen(false)}
				onOk={() => setOpen(false)}
			/>
		</>
	);
}
