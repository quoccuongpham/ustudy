export type NoteGroupByCourse = {
	uuid: string;
	courseId: number;
	cancelled: boolean;
	cencelledReason?: boolean;
	createdAt: string;
	updatedAt: string;
	course: {
		id: number;
		title: string;
		chapters: {
			id: number;
			title: string;
			videos: {
				id: number;
				chapterId: number;
				title: string;
				url: string;
				duration: number;
				sequenceNumber: number;
				subtitleUrl: string | null;
				hidden: boolean;
				notes: {
					id: number;
					title: string;
					content: string;
					folderId: number | null;
					uuid: string;
					videoId: number;
					time: number;
					createdAt: string;
					updatedAt: string;
				}[];
			}[];
		}[];
	};
};
