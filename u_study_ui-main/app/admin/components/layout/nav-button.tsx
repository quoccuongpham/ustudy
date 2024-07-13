import Button from "antd/es/button";
import { MdAnalytics } from "react-icons/md";
export default function NavButton({
	title,
	active = false,
	keyActive,
	onClick,
}: {
	title: string;
	active?: boolean;
	keyActive: number;
	onClick: (k: number) => void;
}) {
	console.log(keyActive);

	return (
		<Button
			type={active ? "primary" : "text"}
			block
			size="large"
			icon={<MdAnalytics size={30} />}
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "start",
				fontWeight: "bold",
			}}
			onClick={() => {
				onClick(keyActive);
			}}
		>
			{title}
		</Button>
	);
}
