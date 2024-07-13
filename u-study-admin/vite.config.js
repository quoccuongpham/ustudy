import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import checker from "vite-plugin-checker";
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		checker({
			eslint: {
				lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
			},
		}),
	],
	resolve: {
		alias: [
			{
				find: /^~(.+)/,
				// eslint-disable-next-line no-undef
				replacement: path.join(process.cwd(), "node_modules/$1"),
			},
			{
				find: /^src(.+)/,
				// eslint-disable-next-line no-undef
				replacement: path.join(process.cwd(), "src/$1"),
			},
		],
	},
});
