import { formaterVND } from "@/lib/utils/formatCurrency";
import Avatar from "antd/es/avatar/avatar";

import ProfileWithdraw from "./profile-withdraw";
import ProfileBalance from "./profile-balance";
export default function ProfileGeneralInfo({
	name,
	email,
	role,
	avatarUrl,
	balance,
}: {
	name: string;
	email: string;
	avatarUrl?: string;
	role: ROLE;
	balance: number;
}) {
	return (
		<div className="p-5 border-gray-200 border-2 rounded-md grid grid-cols-2 items-center">
			<div className="flex items-center">
				<Avatar
					src={avatarUrl ?? "/images/avatars/avatar_2.jpg"}
					size={100}
				/>
				<div className="ml-3 font-bold">
					<p className="">{name}</p>
					<p className="text-slate-400">{email}</p>
					<p className="text-slate-400">{role}</p>
				</div>
			</div>
			<div className="font-bold text-lg text-right">
				<h3>Balance</h3>
				<div className="text-colormain mb-2">
					{/* {formaterVND.format(balance)} */}
					<ProfileBalance balance={balance} />
				</div>
				<ProfileWithdraw data={{ amount: balance }} />
			</div>
		</div>
	);
}
