"use client";
import React, { useState } from "react";
import Input from "antd/es/input/Input";
import Select, { DefaultOptionType } from "antd/es/select";
import TextArea from "antd/es/input/TextArea";
import Button from "antd/es/button";

import createCourse, { CreateCouseForm } from "@/lib/teacher/createCourse";

import { useRouter } from "next/navigation";

export default function Form({
	optionSetlectCategory,
}: {
	optionSetlectCategory: DefaultOptionType[] | undefined;
}) {
	const [select, setSelect] = useState(1);
	const router = useRouter();
	return (
		<form
			action={async (data: FormData) => {
				const formData: CreateCouseForm = {
					...Object.fromEntries(data),
				} as CreateCouseForm;
				try {
					console.log(formData);
					const courseCreated = await createCourse(formData);
					console.log(courseCreated);

					router.push(`/teacher/courses`);
				} catch (error) {}
			}}
			className="w-1/2 mt-5 flex gap-2 flex-col"
		>
			<label
				htmlFor="title"
				className="font-bold text-base text-gray-600"
			>
				Title:
			</label>
			<Input
				size="large"
				id="title"
				placeholder="title"
				name="title"
				required
				autoFocus
			/>
			<label
				htmlFor="description"
				className="font-bold text-base text-gray-600"
			>
				Description:
			</label>
			<TextArea
				size="large"
				rows={5}
				id="description"
				name="description"
				placeholder="description"
				required
			/>
			<label
				htmlFor="price"
				className="font-bold text-base text-gray-600"
			>
				Price:
			</label>
			<Input
				size="large"
				type="number"
				min={0}
				id="price"
				placeholder="price"
				name="price"
				required
			/>
			<label
				htmlFor="category"
				className="font-bold text-base text-gray-600"
			>
				Category:
			</label>
			<Select
				options={optionSetlectCategory}
				id="category"
				size="large"
				onChange={(value) => {
					setSelect(value);
				}}
			></Select>
			<input
				type="text"
				hidden
				value={select}
				name="categoryId"
				readOnly
			/>
			{/* <input
				type="text"
				hidden
				value="https://developers.google.com/static/search/docs/images/course-info-rich-result.png?hl=vi"
				name="image"
			/> */}
			<div className="text-right">
				{/* <Button
					type="default"
					danger
					size="large"
					className="mt-3 mr-3"
					htmlType="reset"
				>
					Clear
				</Button> */}
				<Button
					type="primary"
					size="large"
					className="mt-3 "
					htmlType="submit"
				>
					Create
				</Button>
			</div>
		</form>
	);
}
