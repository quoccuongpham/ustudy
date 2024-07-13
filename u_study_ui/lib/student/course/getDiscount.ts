export const getDiscount = async (courseId: number) => {
	try {
		const res = await fetch(
			`http://localhost:3001/discount/course/${courseId}`
		);

		if (res.ok) {
			return res.json();
		}
		return null;
	} catch (error) {
		return null;
	}
};
