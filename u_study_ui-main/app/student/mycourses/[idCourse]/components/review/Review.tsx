import Rate, { RateProps } from "antd/es/rate";
import Progress from "antd/es/progress";
import TextArea from "antd/es/input/TextArea";
import Button from "antd/es/button";
import { create } from "./actions";
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { useFormStatus } from "react-dom";
import { useCourseStore } from "@/lib/zustand/store";
import moment from "moment";
import { Avatar } from "antd";
type ReviewData = Review & {
	user: {
		name: string;
		email: string;
	};
};
type Rate = {
	[key: number]: number;
	1: number;
	2: number;
	3: number;
	4: number;
	5: number;
};
export default function Review() {
	const [rate, setRate] = useState<number>(0);
	const [content, setContent] = useState<string>("");
	const [reviews, setReviews] = useState<ReviewData[]>([]);
	const [rates, setRates] = useState<Rate>({
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
	});
	const { pending } = useFormStatus();
	const courseStore = useCourseStore((state) => state.course);
	useLayoutEffect(() => {
		fetch(`/api/student/mycourses/review/${courseStore?.id}`)
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
			})
			.then((data) => {
				const rateObj: Rate = {
					1: 0,
					2: 0,
					3: 0,
					4: 0,
					5: 0,
				};
				data.forEach((val: ReviewData) => {
					rateObj[val.rating]++;
				});
				setRates(rateObj);
				setReviews(data);
			});
	}, [courseStore]);

	return (
		<div className="p-5">
			<h2 className="text-lg font-semibold">All reviews</h2>
			<div className="mt-4 flex p-5">
				<div className="text-amber-700">
					<p className="text-7xl font-bold">
						{(
							Object.entries(rates).reduce((prev, curr) => {
								return (
									prev + curr[1] * Number.parseInt(curr[0])
								);
							}, 0) / reviews.length
						).toFixed(1) ?? 5.0}
					</p>
					<Rate
						allowHalf
						value={
							Object.entries(rates).reduce((prev, curr) => {
								return (
									prev + curr[1] * Number.parseInt(curr[0])
								);
							}, 0) / reviews.length
						}
						disabled
						style={{
							color: "#b45309",
						}}
					/>
				</div>
				<div className="ml-5 flex flex-col flex-1">
					{[5, 4, 3, 2, 1].map((value, index) => (
						<div key={index} className="mb-2 flex ">
							<div className="flex-1 mr-5">
								<Progress
									percent={
										Math.round(
											rates[value] / reviews.length
										) * 100
									}
									status="active"
								/>
							</div>
							<Rate
								allowHalf
								value={value}
								disabled
								style={{
									color: "#b45309",
								}}
							/>
						</div>
					))}
				</div>
			</div>
			<div className="mt-5 border border-1 p-5 rounded-md">
				<h2 className="text-lg font-semibold">Your review</h2>
				<form
					action={create}
					onSubmit={() => {
						setContent("");
						setRate(0);
					}}
				>
					<label htmlFor="" className="block font-semibold">
						Rate:
					</label>
					<Rate onChange={(e) => setRate(e)} value={rate} />
					<label htmlFor="" className="block font-semibold mt-2">
						Review:
					</label>
					<input
						type="number"
						value={rate}
						name="rating"
						hidden
						readOnly
					/>
					<input
						type="number"
						value={courseStore?.id}
						name="courseId"
						hidden
						readOnly
					/>
					<TextArea
						rows={3}
						placeholder="Write review for this course..."
						name="reviewText"
						value={content}
						onChange={(e) => {
							setContent(e.target.value);
						}}
					/>
					<Button
						htmlType="submit"
						type="primary"
						className="mt-5"
						aria-disabled={pending}
					>
						Submit
					</Button>
				</form>
			</div>
			{/* List review */}
			<div className="p-3">
				{reviews.map((review) => (
					<div key={review.id} className="flex gap-3">
						<Avatar style={{ backgroundColor: "black" }}>
							{review.user.email.charAt(0).toUpperCase()}
						</Avatar>
						<div className="flex-1">
							<p className="font-bold">{review.user.email}</p>
							<Rate value={review.rating} disabled />
							<p>{review.reviewText}</p>
							<p className="opacity-80">
								{moment(review.createdAt).fromNow()}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
