"use client";
import { useRouter, redirect } from "next/navigation";
import { useEffect } from "react";
import { useLocalStorage } from "@/lib/customHook/useLocalStorage";
export default function Home() {
	const { getItem } = useLocalStorage("user_info");

	useEffect(() => {
		if (!document?.cookie.includes("access_token")) {
			redirect("/auth/login");
		}

		if (localStorage.getItem("access_token")) {
			if (getItem() && getItem().role === "TEACHER") {
				redirect("/teacher/courses");
			}
			redirect("/student/courses");
		} else {
			redirect("/auth/login");
		}
	}, []);

	const router = useRouter();
	const handleClick = () => {
		router.push("/student/courses");
	};
	return (
		<main className=" min-h-screen flex justify-center items-center flex-col gap-10">
			<h1 className="text-3xl font-bold">Geting Started</h1>
			<section>
				<button
					className="bg-colormain px-4 py-2 rounded-xl"
					onClick={handleClick}
				>
					Login
				</button>
			</section>
		</main>
	);
}
