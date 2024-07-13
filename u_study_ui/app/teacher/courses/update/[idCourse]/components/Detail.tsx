"use client";
import Button from "antd/es/button";
import Modal from "antd/es/modal/Modal";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";
import { ChangeEvent, useRef, useState } from "react";
import { message } from "antd";
import updateCourse from "@/lib/teacher/updateCourse";
import Image from "next/image";
import { revalidatePath, revalidateTag } from "next/cache";
import { useRouter } from "next/navigation";

export default function Detail({ course }: { course: Course }) {
	const router = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [courseData, setCourseData] = useState({ ...course });
	const formRef = useRef<HTMLFormElement | null>(null);
	async function handleSubmit(data: FormData) {
		try {
			const formData: {
				title: string;
				description: string;
				price: string;
			} = Object.fromEntries(data) as {
				title: string;
				description: string;
				price: string;
			};
			console.log(formData);
			const updateData = await updateCourse(formData, +course.id);
			console.log(updateData);
			message.success("Updated course");
		} catch (error) {
			message.error("There is an error");
		}
	}

	async function handleChangeThumbnail(e: ChangeEvent<HTMLInputElement>) {
		const formData = new FormData();
		if (e.target.files) {
			formData.append("thumbnail", e.target.files[0]);
		}
		const res = await fetch(
			`http://localhost:3001/courses/thumbnail/${courseData.id}`,
			{
				method: "PATCH",
				body: formData,
				headers: {
					Accept: "*/*",
					Authorization: `Bearer ${localStorage.getItem(
						"access_token"
					)}`,
				},
			}
		);

		if (!res.ok) {
			message.error("Error");
		} else {
			message.success("Change thumbnail successfully");
		}
		res.json().then((value) => {
			setCourseData({ ...courseData, image: value.image });
		});
	}
	return (
		<div>
			<div className="bg-white w-full p-3 flex flex-col gap-3 rounded-md">
				<Modal
					open={isModalOpen}
					onOk={() => {
						setIsModalOpen(false);
						formRef.current?.requestSubmit();
					}}
					onCancel={() => {
						setIsModalOpen(false);
					}}
					closeIcon={false}
				>
					<form action={handleSubmit} ref={formRef}>
						<label
							htmlFor="title"
							className="font-bold text-base text-gray-600"
						>
							Title:
						</label>
						<Input
							defaultValue={course.title}
							size="large"
							id="title"
							placeholder="title"
							name="title"
							required
							autoFocus
							style={{ marginBottom: "10px" }}
						/>
						<label
							htmlFor="description"
							className="font-bold text-base text-gray-600"
						>
							Description:
						</label>
						<TextArea
							defaultValue={course.description}
							size="large"
							rows={5}
							id="description"
							name="description"
							placeholder="description"
							required
							style={{ marginBottom: "10px" }}
						/>
						<label
							htmlFor="price"
							className="font-bold text-base text-gray-600"
						>
							Price:
						</label>
						<Input
							defaultValue={course.price}
							size="large"
							type="number"
							min={0}
							id="price"
							placeholder="price"
							name="price"
							required
							style={{ marginBottom: "10px" }}
						/>
					</form>
				</Modal>
				<p>
					<span className="font-bold text-colormain underline">
						Title:
					</span>{" "}
					{course?.title}
				</p>
				<p className="whitespace-pre-line">
					<span className="font-bold text-colormain underline">
						Description:
					</span>{" "}
					{course?.description.substring(0, 300) + "..."}
				</p>
				<p>
					<span className="font-bold text-colormain underline">
						Price:
					</span>{" "}
					{course?.price}
				</p>
				<Button
					htmlType="button"
					type="primary"
					style={{ backgroundColor: "#3cbea9" }}
					onClick={() => {
						setIsModalOpen(true);
					}}
				>
					Modify
				</Button>
			</div>
			<div className="mt-5 bg-white p-3 rounded-md">
				<h2 className="text-colormain font-bold mb-2">Thumbnail:</h2>
				<Image
					alt="thumbnail"
					src={courseData.image}
					width={1000}
					height={1000}
				></Image>
				<input
					type="file"
					name="image"
					className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mt-2"
					onChange={handleChangeThumbnail}
				/>
			</div>
		</div>
	);
}
