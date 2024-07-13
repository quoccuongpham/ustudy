export const checkCoupon = async (courseId: number, coupon: string) => {
	try {
		const res = await fetch(
			`http://localhost:3001/discount/check?courseId=${courseId}?coupon=${coupon}`
		);

		if (res.ok) {
			return res.json();
		}
		return null;
	} catch (error) {
		return null;
	}
};
