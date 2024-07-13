import getDataCourse from "@/lib/student/getDataCourse";
import { checkCoupon } from "@/lib/student/course/checkCoupon";

import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
// icons
import { HomeOutlined } from "@ant-design/icons";

// components
import BreadcrumbCustom from "@/app/components/BreadcrumbCustom";
import ListVideo from "./components/ListVideo";
import Cart from "./components/add-to-cart";
import CheckCoupon from "./components/check-coupon";
import { formaterVND } from "@/lib/utils/formatCurrency";

const Tag = dynamic(() => import("antd/es/tag"), { ssr: false });
const Button = dynamic(() => import("antd/es/button"), { ssr: false });

import Input from "antd/es/input";
import RightMenu from "./components/right-menu";

type Props = {
	params: {
		idCourse: number;
	};
};

export default async function CourseDetail({ params: { idCourse } }: Props) {
	const dataCourse = await getDataCourse(+idCourse);

	const path: {
		href: string;
		title: JSX.Element | string;
	}[] = [
		{
			href: "",
			title: (
				<p className="text-colormain font-bold">
					<HomeOutlined />
				</p>
			),
		},
		{
			href: "/student/courses",
			title: <p className="text-colormain font-bold">Courses</p>,
		},
		{
			href: `/student/courses/${idCourse}`,
			title: `${idCourse}`,
		},
	];

	const listVideo = dataCourse?.chapters;

	if (!dataCourse) {
		notFound();
	}
	return (
		<div className="p-5">
			<BreadcrumbCustom path={path} />
			<section className="grid md:grid-cols-3 mt-3 gap-5">
				<div className="bg-colorbg1 min-h-screen md:col-span-2 rounded-lg p-5">
					<Tag color="cyan">{dataCourse.category.description}</Tag>
					<h1 className="font-bold text-2xl mt-3">
						{dataCourse.title}
					</h1>
					<div className="mt-3">
						<p className="text-gray-500 mb-2">
							Created by:{" "}
							<span className="font-bold underline">
								{dataCourse.user.name}
							</span>
						</p>
						<p className="text-gray-500 mb-1">
							Created at:{" "}
							<span className="font-bold underline">
								{new Date(
									dataCourse.createdAt
								).toLocaleDateString("vi")}
							</span>
						</p>
						<p className="text-gray-500">
							Last updated:{" "}
							<span className="font-bold underline">
								{new Date(
									dataCourse.updateAt
								).toLocaleDateString("vi")}
							</span>
						</p>
					</div>
					<p className="mt-5 text-xl font-bold">About the course</p>
					<p className="mt-2 text-gray-500">
						{dataCourse.description}
					</p>
					<p className="mt-5 text-xl font-bold">Video Course</p>
					<div className="mt-3">
						{listVideo ? <ListVideo listVideo={listVideo} /> : null}
					</div>
				</div>
				{/* <div className="h-fit w-full bg-white rounded-lg">
					<Image
						src={dataCourse.image}
						alt={dataCourse.title}
						width={2000}
						height={2000}
						priority={true}
						className="w-full rounded-md"
					></Image>
					<h2 className="text-xl font-bold px-3 mt-5">
						{formaterVND.format(dataCourse.price)}
					</h2>

					<div className="flex justify-between p-3">
						<Link href={`/student/courses/payment/${idCourse}`}>
							<button className="w-40 h-10 rounded-md bg-colormain text-white font-bold hover:bg-colormain/80">
								Erroll course
							</button>
						</Link>
						<Cart data={dataCourse} />
					</div>

					<p className="text-colormain font-bold p-3">
						Did you have coupon?
					</p>
					<CheckCoupon courseId={+idCourse} />
				</div> */}
				<RightMenu dataCourse={dataCourse} />
			</section>
		</div>
	);
}
