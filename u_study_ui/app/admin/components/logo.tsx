import Link from "next/link";

export default function Logo() {
	return (
		<Link href={"/"} className="text-inherit hover:text-inherit">
			<div className="font-bold text-xl pt-2 pb-6 ">
				<span className="text-colormain">U</span>-Study.
			</div>
		</Link>
	);
}
