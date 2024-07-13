"use client";
import React, { useState } from "react";
import BarChart from "../components/BarChart";
import { ChartData } from "chart.js";

export default function Page() {
	const [data, setData] = useState<
		ChartData<"bar", (number | [number, number] | null)[], unknown>
	>({
		labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
		datasets: [
			{
				label: "User Gain",
				backgroundColor: "rgba(54, 162, 235, 0.5)",
				borderColor: "rgba(54, 162, 235, 1)",
				borderWidth: 1,
				data: Array.from(
					{ length: 30 },
					() => Math.floor(Math.random() * 10000) + 500
				),
			},
		],
	});
	return (
		<div className="w-full">
			<BarChart charData={data} />
		</div>
	);
}
