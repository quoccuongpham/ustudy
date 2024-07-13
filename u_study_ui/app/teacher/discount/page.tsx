import { cookies } from "next/headers";

import Tabs from "antd/es/tabs";

import DiscountCourse from "./discount-course";
import GenerateCoupon from "./generate-coupon";

export type CourseWithDiscount = Course & { discounts: Discount[] };
export type DiscountWithCourse = Discount & { course: Course };
export default async function Discount() {
	const cookiesStore = cookies();

	const resCourse = await fetch("http://localhost:3001/discount/course", {
		headers: {
			Authorization: `Bearer ${cookiesStore.get("access_token")?.value}`,
		},
		next: {
			revalidate: 0,
		},
	});

	const resDiscount = await fetch("http://localhost:3001/discount/user", {
		headers: {
			Authorization: `Bearer ${cookiesStore.get("access_token")?.value}`,
		},
		next: {
			revalidate: 0,
		},
	});

	let courses: CourseWithDiscount[] = [];
	let discounts: DiscountWithCourse[] = [];

	if (resCourse.ok) {
		courses = await resCourse.json();
	}

	if (resDiscount.ok) {
		discounts = await resDiscount.json();
	}

	return (
		<div className="p-3">
			<h1 className="text-lg font-bold">Discount</h1>
			<div className="bg-white rounded-md mt-3 min-h-[calc(100vh-130px)] p-3">
				<Tabs
					tabPosition="left"
					items={[
						{
							key: "1",
							label: "Discount Course",
							children: <DiscountCourse courses={courses} />,
						},
						{
							key: "2",
							label: "Generate Coupon",
							children: (
								<GenerateCoupon
									coupon={discounts}
									courses={courses}
								/>
							),
						},
					]}
				/>
			</div>
		</div>
	);
}
