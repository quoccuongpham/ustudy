"use client";
import type { StatisticProps } from "antd";
import Statistic from "antd/es/statistic/Statistic";

import CountUp from "react-countup";

export default function ProfileBalance({ balance }: { balance: number }) {
	const formatter: StatisticProps["formatter"] = (value) => (
		<CountUp
			end={value as number}
			separator="."
			suffix="đ"
			style={{ color: "#3cbea9" }}
			duration={1}
		/>
	);
	return (
		<Statistic
			value={balance}
			formatter={formatter}
			style={{ color: "#3cbea9" }}
		/>
	);
}
