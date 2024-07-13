"use client";
import { useFormState } from "react-dom";

import { revalidatePath } from "next/cache";

import { Modal, Input, Button, Select } from "antd";

import type { WithDrawData } from "./profile-withdraw";
import { formaterVND } from "@/lib/utils/formatCurrency";
import { withdraw } from "./actions";

const WithdrawModal = ({
	isVisible,
	data,
	onCancel,
	onOk,
}: {
	isVisible: boolean;
	data: WithDrawData;
	onCancel: () => void;
	onOk: () => void;
}) => {
	const [state, action] = useFormState(withdraw, {});
	console.log(state);
	return (
		<Modal
			title="Withdraw From Your Account"
			open={isVisible}
			onCancel={onCancel}
			onOk={onOk}
			footer={false}
		>
			<div>
				<span className="text-colormain font-bold">Total:</span>{" "}
				<span className="font-bold">
					{formaterVND.format(data.amount)}
				</span>
			</div>
			<form
				className="px-5 grid grid-cols-3 gap-y-5 gap-x-5 mt-10"
				action={action}
			>
				<div className="col-span-3">
					<label className="font-bold mb-2 inline-block">Name</label>
					<Input
						size="small"
						placeholder="Name"
						name="name"
						autoFocus
						required
					/>
				</div>
				<div className="">
					<label className="font-bold mb-2 inline-block">
						Card number
					</label>
					<Input
						size="small"
						type="text"
						placeholder="Card Number"
						name="card_number"
						required
					/>
				</div>
				<div className="">
					<label className="font-bold mb-2 inline-block">
						Date Expiration
					</label>
					<Input
						size="small"
						type="date"
						placeholder="Expiration"
						name="expiration"
						required
					/>
				</div>
				<div className="">
					<label className="font-bold mb-2 inline-block">CVV</label>
					<Input
						size="small"
						placeholder="CVV"
						name="cvv"
						maxLength={3}
						required
					/>
				</div>
				<div className="col-span-2">
					<label className="font-bold mb-2 inline-block">Email</label>
					<Input
						size="small"
						type="mail"
						placeholder="Email"
						name="email"
						required
					/>
				</div>
				<Button
					loading={false}
					type="primary"
					htmlType="submit"
					className="col-span-3 w-1/4 mx-auto mt-5"
					onClick={() => {
						//
					}}
				>
					Submit
				</Button>
			</form>
		</Modal>
	);
};

export default WithdrawModal;
