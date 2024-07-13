"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import { message } from "antd";

const styleInput =
	"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

export default function Register() {
	const router = useRouter();
	async function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		if (formData.get("password") !== formData.get("confirm-password")) {
			message.error("Password does not match");
			return;
		}
		fetch("/api/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: formData.get("email"),
				password: formData.get("password"),
				name: formData.get("name"),
				role: formData.get("role"),
			}),
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				message.error("Error");
			})
			.then((data) => {
				if (data) {
					message.success("Success");
					router.push("/auth/login");
				}
			});
		return true;
	}

	return (
		<section className="bg-gray-50 dark:bg-gray-900 py-10">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
				<a
					href="#"
					className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
				>
					<Image
						className="w-8 h-8 mr-2"
						src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
						alt="logo"
						width={32}
						height={32}
					/>
					U Study
				</a>
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Create and account
						</h1>
						<form
							className="space-y-4 md:space-y-6"
							onSubmit={onSubmit}
						>
							<div>
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Your email
								</label>
								<input
									type="email"
									name="email"
									id="email"
									className={`${styleInput}`}
									placeholder="name@company.com"
									required
								/>
							</div>
							<div>
								<label
									htmlFor="password"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Password
								</label>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									className={`${styleInput}`}
									required
								/>
							</div>
							<div>
								<label
									htmlFor="confirm-password"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Confirm password
								</label>
								<input
									type="password"
									name="confirm-password"
									id="confirm-password"
									placeholder="••••••••"
									className={`${styleInput}`}
									required
								/>
							</div>
							<div>
								<label
									htmlFor="confirm-password"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Your name:
								</label>
								<input
									type="text"
									name="name"
									id="name"
									placeholder="Your name"
									className={`${styleInput}`}
									required
								/>
							</div>
							<div>
								<label
									htmlFor="confirm-password"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Select type of user:
								</label>
								<select
									name="role"
									id="role"
									className={`${styleInput}`}
									required
								>
									<option value="STUDENT">Student</option>
									<option value="TEACHER">Teacher</option>
								</select>
							</div>
							<div className="flex items-start">
								<div className="flex items-center h-5">
									<input
										id="terms"
										aria-describedby="terms"
										type="checkbox"
										className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
										required
									/>
								</div>
								<div className="ml-3 text-sm">
									<label
										htmlFor="terms"
										className="font-light text-gray-500 dark:text-gray-300"
									>
										I accept the{" "}
										<a
											className="font-medium text-primary-600 hover:underline dark:text-primary-500"
											href="#"
										>
											Terms and Conditions
										</a>
									</label>
								</div>
							</div>
							<button
								type="submit"
								className="w-full text-white bg-colormain hover:bg-colormain/70 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
							>
								Create an account
							</button>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Already have an account?{" "}
								<Link
									href="/auth/login"
									className="font-medium text-primary-600 hover:underline dark:text-primary-500"
								>
									Login here
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
