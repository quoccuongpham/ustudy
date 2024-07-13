import { HomeOutlined } from "@ant-design/icons";
export const StudentMycourse = (
	idCourse: string
): {
	href: string;
	title: JSX.Element | string;
}[] => {
	return [
		{
			href: "",
			title: (
				<p className="text-colormain font-bold">
					<HomeOutlined />
				</p>
			),
		},
		{
			href: "/student/mycourses",
			title: <p className="text-colormain font-bold">My Courses</p>,
		},
		{
			href: `/student/mycourses/${idCourse}`,
			title: `${idCourse}`,
		},
	];
};

export const TeacherMyCourseView = (
	idCourse: string
): {
	href: string;
	title: JSX.Element | string;
}[] => {
	return [
		{
			href: "/",
			title: (
				<p className="text-colormain font-bold">
					<HomeOutlined />
				</p>
			),
		},
		{
			href: "/teacher/mycourses",
			title: <p className="text-colormain font-bold">My Courses</p>,
		},
		{
			href: `/teacher/mycourses/view/${idCourse}`,
			title: `${idCourse}`,
		},
	];
};
