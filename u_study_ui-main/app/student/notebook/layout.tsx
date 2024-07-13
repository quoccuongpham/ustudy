import React from "react";

export default async function NotebookLayout({
	children,
	folder,
}: {
	children: React.ReactNode;
	folder: React.ReactNode;
}) {
	return (
		<div className="flex min-h-[calc(100vh-60px)]">
			<div className="w-1/4 border-r-2 p-2 rounded-sm bg-white">
				{folder}
			</div>
			{children}
		</div>
	);
}
