import Nav from "./components/layout/nav";
import Logo from "./components/logo";
export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex">
			<div className="lg:w-1/6 p-3 h-screen">
				<div className="pl-2">
					<Logo />
				</div>
				<nav className="h-full">
					<Nav />
				</nav>
			</div>
			<div>
				<header className="h-16">header</header>
				<div>{children}</div>
			</div>
		</div>
	);
}
