import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				colormain: "#3cbea9",
				colormain2: "#7b61ff",
				colortext: "#031f31",
				colorbg1: "#f7f8fa",
				colorbg2: "#e3e8ef",
				colorbg3: "#ebfbf6",
			},
		},
	},
	plugins: [],
};
export default config;
