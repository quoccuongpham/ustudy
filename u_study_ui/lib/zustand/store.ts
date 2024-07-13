import { create } from "zustand";
import { DataNode } from "antd/es/tree";
import { MutableRefObject } from "react";
import ReactPlayer from "react-player";
type VideoStore = {
	video: Video | null;
	time: number;
	playerRef: MutableRefObject<ReactPlayer | null> | null;
	setVideo: (video: Video | null) => void;
	setRef: (ref: MutableRefObject<ReactPlayer | null> | null) => void;
	setTime: (time: number) => void;
};

type CourseStore = {
	course: Course | null;
	setCourse: (course: Course) => void;
};

type CommentStore = {
	comment: CommentData | null;
	setComment: (comment: CommentData | null) => void;
	appendChild: (commentChild: CommentData) => void;
};

type FolderTreeStore = {
	folders: DataNode[] | null;
	setFolder: (folders: Folder[]) => void;
	appendChildren: (children: DataNode[]) => void;
};

type DrawerNavStore = {
	isOpen: boolean;
	setOpen: (isOpen: boolean) => void;
};

type NoteStore = {
	note: Note | null;
	setNote: (note?: Note) => void;
};

type NoteFolderStore = {
	id: number | null;
	setId: (id: number | null) => void;
};

export const useVideoStore = create<VideoStore>((set) => ({
	video: null,
	playerRef: null,
	time: 0,
	setVideo: (video: Video | null) => {
		if (video) {
			set((state) => ({
				...state,
				video: video,
			}));
		}
	},
	setRef: (ref: MutableRefObject<ReactPlayer | null> | null) => {
		set((state) => ({
			...state,
			playerRef: ref,
		}));
	},
	setTime: (time: number) => {
		set((state) => ({
			...state,
			time: time,
		}));
	},
}));

export const useCommentStore = create<CommentStore>((set) => ({
	comment: null,
	setComment: (comment: CommentData | null) => {
		set({ comment: comment });
	},
	appendChild: (commentChild: CommentData) => {
		set((state) => {
			// if (state.comment) {
			// 	let newCommnet = { ...state.comment };
			// 	newCommnet.children?.push(commentChild);
			// 	return { comment: commentChild };
			// }
			// return {
			// 	comment: state.comment,
			// };
			if (state.comment) {
				return {
					comment: {
						...state.comment,
						children: [commentChild, ...state.comment?.children],
					},
				};
			} else {
				return {
					comment: state.comment,
				};
			}
		});
	},
}));

export const useFolderStore = create<FolderTreeStore>((set) => ({
	folders: null,
	setFolder(folders) {
		const foldersFormat: DataNode[] = folders.map((folder) => {
			return {
				title: folder.name,
				key: folder.id,
				isLeaf: false,
			};
		});
		set({
			folders: foldersFormat,
		});
	},
	appendChildren(children) {
		set((state) => {
			if (state.folders == null) {
				return {
					folders: children,
				};
			} else {
				return {
					folders: {
						...state.folders,
						children: children,
					},
				};
			}
		});
	},
}));

export const useDrawerNavStore = create<DrawerNavStore>((set) => ({
	isOpen: false,
	setOpen(isOpen) {
		set({
			isOpen: isOpen,
		});
	},
}));

export const useNoteStore = create<NoteStore>((set) => ({
	note: null,
	setNote(note?: Note) {
		if (note) {
			set({
				note: note,
			});
		}
	},
}));

export const useCourseStore = create<CourseStore>((set) => ({
	course: null,
	setCourse(course?: Course) {
		if (course) {
			set({
				course: course,
			});
		}
	},
}));

export const useNoteFolderStore = create<NoteFolderStore>((set) => ({
	id: null,
	setId(id: number | null) {
		set({
			id: id,
		});
	},
}));
