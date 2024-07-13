import React from "react";
import { FiTrendingUp } from "react-icons/fi";

type Props = {
	title: string;
	subTitle: string;
	value: string | number;
	icon: JSX.Element;
	color: string;
	background: string;
};
export default function InfoCourseItem({
	title,
	subTitle,
	value,
	icon,
	color,
	background,
}: Props) {
	return (
		<div className="bg-white rounded-md w-1/3 p-3">
			<div className="flex justify-between items-center">
				<p className="inline-block font-bold text-gray-500">{title}</p>
				<div
					className={`${color} ${background} inline-block p-2 rounded-full`}
				>
					{icon}
				</div>
			</div>
			<div className={`font-bold ${color}`}>
				<FiTrendingUp size={20} />
			</div>
			<div className="flex justify-between items-center">
				<span className="text-gray-500 font-semibold inline-block">
					{subTitle}:{" "}
				</span>
				<span className={`text-xl font-bold ${color} inline-block`}>
					{value}
				</span>
			</div>
		</div>
	);
}
