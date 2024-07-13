import React from "react";

export default function Layout({
	children,
	team,
}: {
	children: React.ReactNode;
	team: React.ReactNode;
}) {
	return (
		<div className="w-screen h-screen">
			<div>{children}</div>
		</div>
	);
}
