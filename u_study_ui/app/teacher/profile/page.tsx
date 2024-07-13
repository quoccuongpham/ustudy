import { cookies } from "next/headers";

import Tabs from "antd/es/tabs";

import ProfileGeneralInfo from "./profile-general-info";
// import ProfilePayment from "./profile-payment";
import ProfileCoursesSold from "./profile-courses-sold";
import CourseSetting from "./course-setting";
import Payment from "./payment";

import {
	convertToTableData,
	convertToPaymentTableData,
	DataCourseSold,
	TableData,
	PaymentTableData,
} from "./utils";

const mock: Transaction[] = [
	{
		id: 1,
		uuid: "1",
		amount: 1000,
		type: "WITHDRAWAL",
		status: "SUCCESS",
		createdAt: "2021-01-01",
		updatedAt: "2021-01-01",
	},
	{
		id: 2,
		uuid: "2",
		amount: 2000,
		type: "PAYMENT",
		status: "PENDING",
		createdAt: "2021-01-02",
		updatedAt: "2021-01-02",
	},
];
export default async function ProfilePage() {
	const cookiesStore = cookies();
	const res = await fetch("http://localhost:3001/users/profile", {
		headers: {
			Authorization: `Bearer ${cookiesStore.get("access_token")?.value}`,
		},
		next: {
			revalidate: 0,
		},
	});
	const resCoursesSold = await fetch("http://localhost:3001/payment", {
		headers: {
			Authorization: `Bearer ${cookiesStore.get("access_token")?.value}`,
		},
	});

	const resPayment = await fetch("http://localhost:3001/transaction/user", {
		headers: {
			Authorization: `Bearer ${cookiesStore.get("access_token")?.value}`,
		},
	});

	const profile: User = await res.json();

	let cousesSold: TableData[] = [];
	if (resCoursesSold.ok) {
		let data: DataCourseSold[] = await resCoursesSold.json();

		cousesSold = convertToTableData(data);
	}

	let paymentTableData: PaymentTableData[] = [];
	if (resPayment.ok) {
		let data = await resPayment.json();
		paymentTableData = convertToPaymentTableData(data);
	}

	const renderAccount = (
		<>
			<div>
				<h2 className="font-bold text-base mb-3">My Profile</h2>
				<ProfileGeneralInfo
					name={profile.name}
					email={profile.email}
					role={profile.role}
					avatarUrl={profile.avatarUrl}
					balance={profile.balance}
				/>
			</div>
			<div>
				<h2 className="font-bold text-base my-3">Courses Sold</h2>
				<ProfileCoursesSold data={cousesSold} />
			</div>
		</>
	);

	return (
		<div className="p-5">
			{/* <h1 className="font-bold text-xl">Account</h1> */}
			<div className="min-h-screen bg-white rounded-md mt-3 p-5">
				<Tabs
					tabPosition="left"
					items={[
						{
							key: "1",
							label: "Account",
							children: renderAccount,
						},
						{
							key: "2",
							label: "Course Settings",
							children: <CourseSetting />,
						},
						{
							key: "3",
							label: "Payment",
							children: <Payment data={paymentTableData} />,
						},
					]}
				/>
			</div>
		</div>
	);
}
