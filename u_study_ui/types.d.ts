type ROLE = "STUDENT" | "TEACHER" | "ADMIN";
type Course = {
	id: number;
	uuid: string;
	categoryId: number;
	title: string;
	description: string;
	image: string;
	price: number;
	createdAt: string;
	updateAt: string;
	user: {
		email: string;
		name: string;
	};
	category: {
		description: string;
	};
	chapters: Chapter[];
};

type Chapter = {
	id: number;
	courseId: number;
	title: string;
	sequenceNumber: number;
	videos: Video[];
};
type Video = {
	id: number;
	title: string;
	duration: string;
	sequenceNumber: number;
	url?: string;
	learnings?: Learning[];
	hidden: boolean;
};
type ChapterItem = {
	id: number;
	title: string;
	url: string;
	time: string;
};
type ChapterCourse = {
	id: number;
	title: string;
	children: ChapterItem[];
};

type Learning = {
	videoId: number;
	uuid: string;
	timeLearned: number;
	completed: boolean;
};

type CommentData = {
	id: number;
	videoId: number;
	userId: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	parentId: number;
	user: {
		email: string;
		avatarUrl: string;
	};
	children: CommentData[];
	video: Video;
};
type Folder = {
	id: number;
	name: string;
	parentFolderId: number | null;
	uuid: string;
	courseId: number | null;
	notes: Note[];
	children: Folder[];
};

type Note = {
	id: number;
	title: string;
	content: string;
	time?: number;
	folderId: number;
	uuid: string;
	videoId: number;
	createdAt: string;
	updatedAt: string;
};

type Review = {
	courseId: number;
	createdAt: string;
	id: number;
	rating: number;
	reviewText: string;
	updateAt: string;
	uuid: string;
};

type User = {
	uuid: string;
	email: string;
	password: string;
	name: string;
	role: ROLE;
	avatarUrl?: string;
	status: STATUS;
	area: AREA;
	balance: number;
	createdAt: string;
	updatedAt: string;
};

type Category = {
	id: number;
	description: string;
};

type Transaction = {
	id: number;
	uuid: string;
	amount: number;
	type: TransactionType;
	status: TransactionStatus;
	createdAt: string;
	updatedAt: string;
};

type Schedule = {
	courseId: number;
	uuid: string;
	day: string;
	time: string;
	end: string;
};

type Discount = {
	id: number;
	courseId: number;
	coupon: string;
	percentage: number;
	type: "WITH_COUPON" | "WITHOUT_COUPON";
	expiredAt: string;
	createdAt: string;
};
type TransactionType =
	| "DEPOSIT" // Nạp tiền
	| "WITHDRAWAL" // Rút tiền
	| "TRANSFER" // Chuyển kết
	| "PAYMENT" // Thanh toán
	| "FEE" // Phí
	| "REFUND"; // Hoàn trả

type TransactionStatus =
	| "PENDING" // Đang chờ xử lý
	| "SUCCESS" // Thành công
	| "FAILED" // Thất bại
	| "CANCELED"; // Đã hủy

type AREA = "ASIA" | "EUROPE" | "AMERICAS" | "AFRICA";
type STATUS = "ACTIVE" | "BANNED";
