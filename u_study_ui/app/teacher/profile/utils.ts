export type DataCourseSold = {
	courseId: number;
	uuid: string;
	amount: number;
	createdAt: string;
	course: {
		title: string;
		category: {
			id: number;
			description: string;
		};
	};
	user: {
		name: string;
		email: string;
	};
};

export type TableData = {
	id: number;
	courseName: string;
	price: number;
	date: string;
	userEmail: string;
	category: string;
};

export type PaymentTableData = {
	id: number;
	amount: number;
	date: string;
	type: string;
	status: string;
};

export const convertToTableData = (data: DataCourseSold[]): TableData[] => {
	if (data.length === 0) {
		return [];
	}

	return data.map((value, index) => {
		return {
			id: index,
			courseName: value.course.title,
			price: value.amount,
			date: new Date(value.createdAt).toLocaleDateString("vi-VN"),
			userEmail: value.user.email,
			category: value.course.category.description,
		};
	});
};

export const convertToPaymentTableData = (
	data: Transaction[]
): PaymentTableData[] => {
	if (data.length === 0) {
		return [];
	}

	return data.map((value, index) => {
		return {
			id: value.id,
			amount: value.amount,
			date: new Date(value.createdAt).toLocaleDateString("vi-VN"),
			type: value.type,
			status: value.status,
		};
	});
};
