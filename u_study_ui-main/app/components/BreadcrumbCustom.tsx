"use client";
import { Breadcrumb } from "antd";

type Path = {
	href: string;
	title: JSX.Element | string;
};

export default function BreadcrumbCustom({ path }: { path: Path[] }) {
	return <Breadcrumb items={path} />;
}
