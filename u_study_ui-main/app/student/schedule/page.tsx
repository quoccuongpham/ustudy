"use client";
import Calendar, { CalendarProps } from "antd/es/calendar";
import Badge, { BadgeProps } from "antd/es/badge";

import type { Dayjs } from "dayjs";
import Button from "antd/es/button";
import { FiCalendar } from "react-icons/fi";
import Modal from "antd/es/modal/Modal";
import { useEffect, useState, useRef } from "react";
// import Select from "antd/es/select";
// import { Input, TimePicker } from "antd";
// import Input from "antd/es/input/Input";
import TimePicker from "antd/es/time-picker";

type EventSchedule = Schedule & { course: { title: string } };
export default function Schedule() {
	const [daysSelect, setDaysSelect] = useState<number[]>([]);
	const [courseSelect, setCourseSelect] = useState<Course>();
	const [listCourse, setListCourse] = useState<any[]>([]);

	// get event from server
	const [events, setEvents] = useState<EventSchedule[]>([]);

	const [visible, setVisible] = useState(false);
	const [modalDetailDay, setModalDetailDay] = useState(false);
	const [selectEvents, setSelectEvents] = useState<{
		events: { type: string; content: string; time?: string }[];
		date: string;
	}>();
	const formRef = useRef<HTMLFormElement>(null);

	// create or update
	const handleSubmitSchedule = (formData: FormData) => {
		console.log(Object.fromEntries(formData));
		let data = {
			...Object.fromEntries(formData),
			end: new Date(formData.get("end") as string),
			day: JSON.stringify(daysSelect),
		};
		fetch("http://localhost:3001/schedule", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("access_token")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => {
				handleFilterEvents();
			});
	};

	useEffect(() => {
		// get list course
		fetch("/api/student/mycourses")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);

				setListCourse(data);
			});

		// get list event
		fetch("http://localhost:3001/schedule/user", {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("access_token")}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setEvents(data);
			});
	}, []);

	// handle filter events after update or create
	const handleFilterEvents = () => {
		fetch("http://localhost:3001/schedule/user", {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("access_token")}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setEvents(data);
			});
	};
	const getListData = (value: Dayjs) => {
		let listData;

		let event = events.filter((e) => {
			let days = JSON.parse(e.day) as number[];
			return days.includes(new Date(value.toDate()).getDay());
		});
		if (event) {
			listData = event
				.filter((e) => {
					if (!e?.end) {
						return true;
					}
					return new Date(e.end) > new Date(value.toDate());
				})
				.map((e) => {
					return {
						type: "success",
						content: e.course.title,
						time: e?.time,
					};
				});
		}
		return listData || [];
	};

	const dateCellRender = (value: Dayjs) => {
		const listData = getListData(value);
		return (
			<ul className="events">
				{listData.map((item, index) => (
					<li key={index}>
						<Badge
							status={item.type as BadgeProps["status"]}
							text={item.content}
						/>
					</li>
				))}
			</ul>
		);
	};
	const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
		if (info.type === "date") return dateCellRender(current);
		return info.originNode;
	};
	return (
		<div className="bg-white p-3">
			<div className="flex justify-end items-center">
				<Button
					type="primary"
					icon={<FiCalendar />}
					className="inline-flex items-center"
					onClick={() => setVisible(true)}
				>
					Add Schedule
				</Button>
			</div>
			<Calendar
				cellRender={cellRender}
				onSelect={(date, info) => {
					if (info.source === "date") {
						setModalDetailDay(true);
						setSelectEvents({
							events: getListData(date),
							date: date.format("YYYY-MM-DD"),
						});
					}
				}}
			/>
			<Modal
				open={visible}
				onCancel={() => {
					setVisible(false);
				}}
				onOk={() => {
					formRef.current?.requestSubmit();
					setVisible(false);
				}}
				title="Add Schedule"
			>
				<form
					ref={formRef}
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmitSchedule(new FormData(e.currentTarget));
					}}
				>
					<label htmlFor="courseId" className="block font-bold mb-2">
						Select your course:
					</label>
					<select
						name="courseId"
						id="courseId"
						// value={courseSelect}
						onChange={(e) => {
							setCourseSelect(
								listCourse.find((val) => {
									return (
										val.course.id === Number(e.target.value)
									);
								}).course
							);
						}}
					>
						{listCourse.map((val, index) => (
							<option value={val.course.id} key={val.course.id}>
								{val.course.title}
							</option>
						))}
					</select>
					<label className="block font-bold mb-2 mt-2">
						Chooses day:
					</label>
					<div className="flex">
						{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
							(day, index) => (
								<Button
									key={index}
									value={index}
									type={
										daysSelect.includes(index)
											? "primary"
											: "default"
									}
									onClick={() => {
										if (daysSelect.includes(index)) {
											setDaysSelect(
												daysSelect.filter(
													(el) => el !== index
												)
											);
											return;
										}
										setDaysSelect([...daysSelect, index]);
									}}
									className="mr-2"
								>
									{day}
								</Button>
							)
						)}
					</div>
					<label htmlFor="time" className="block font-bold mb-2 mt-2">
						Time:
					</label>
					<input
						type="time"
						id="time"
						name="time"
						onChange={(e) => console.log(typeof e.target.value)}
					/>
					<label htmlFor="end" className="block font-bold mb-2 mt-2">
						End affter:
					</label>
					<input type="date" name="end" id="end" />
				</form>
			</Modal>
			<Modal
				open={modalDetailDay}
				onCancel={() => setModalDetailDay(false)}
				title={selectEvents?.date}
				closable={false}
				footer={false}
			>
				{selectEvents?.events.map((val, index) => (
					<div key={index} className="mb-5 flex justify-between">
						<Badge
							status={val.type as BadgeProps["status"]}
							text={val.content}
						/>
						<span className="font-bold">{val?.time}</span>
					</div>
				))}
			</Modal>
		</div>
	);
}
