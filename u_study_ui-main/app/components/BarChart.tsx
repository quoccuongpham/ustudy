import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { ChartData } from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";
Chart.register(CategoryScale);
export default function BarChart({
	charData,
}: {
	charData: ChartData<"bar", (number | [number, number] | null)[], unknown>;
}) {
	return (
		<Bar
			data={charData}
			width="auto"
			options={{
				responsive: true,
			}}
		/>
	);
}
