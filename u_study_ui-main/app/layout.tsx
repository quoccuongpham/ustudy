import type { Metadata } from "next";
import { Roboto, Public_Sans, Poppins, Montserrat } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import "./globals.css";

const montserrat = Montserrat({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-montserrat",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const poppins = Poppins({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-poppins",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const roboto = Roboto({
	subsets: ["latin"],
	display: "swap",
	weight: ["100", "300", "400", "500", "700", "900"],
});

const publicSans = Public_Sans({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-public-sans",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	title: "U Study App",
	description: "Courses, take note and share document",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="">
				<AntdRegistry>
					<ConfigProvider
						theme={{
							token: {
								fontFamily: montserrat.style.fontFamily,
							},
							components: {
								Menu: {
									darkItemSelectedBg: "#3cbea9",
								},
								Tree: {
									directoryNodeSelectedBg: "#3cbea9",
								},
							},
						}}
					>
						{children}
					</ConfigProvider>
				</AntdRegistry>
			</body>
		</html>
	);
}
