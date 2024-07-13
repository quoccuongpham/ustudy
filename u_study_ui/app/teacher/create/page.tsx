import React from "react";
import { DefaultOptionType } from "antd/es/select";
import Form from "./components/Form";
// fetch
import getCategory from "@/lib/general/getCategory";

export default async function Create() {
	const categories = await getCategory();

	let optionSetlectCategory: DefaultOptionType[] | undefined;
	if (categories) {
		optionSetlectCategory = categories.map((el) => {
			return {
				label: el.description,
				value: el.id,
			};
		});
	}

	return (
		<div className="p-3">
			<h1 className="text-xl font-bold mb-3">Create Course</h1>
			<div className="bg-white rounded-md p-3 flex justify-center min-h-screen">
				<Form optionSetlectCategory={optionSetlectCategory} />
			</div>
		</div>
	);
}
