import type { Config } from "tailwindcss"

const { nextui } = require("@nextui-org/theme")
const config: Config = {
	// darkMode: ["class"],
	content: [
		"../../apps/web/app/**/*.{ts,tsx}",
		"../../apps/web/lib/components/**/*.{ts,tsx}",
		"../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
		"../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	prefix: "",
	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/typography"),
		nextui({
			themes: {
				light: {
					colors: {
						primary: {
							DEFAULT: "#E114E5",
							50: "#FCDBFD", // 非常浅的紫色
							100: "#F9B7FA", // 浅紫色
							200: "#F38FF5", // 较浅的紫色
							300: "#ED67F0", // 中等亮度的紫色
							400: "#E73FEB", // 稍亮的紫色
							500: "#E114E5", // 原始的紫色，色彩饱和
							600: "#B810B9", // 稍深的紫色
							700: "#8C0C8E", // 深紫色
							800: "#600862", // 很深的紫色
							900: "#340436", // 极深的紫色
							950: "#1E021F", // 几乎黑色的紫色
						},
					},
				},
				dark: {
					colors: {},
				},
			},
		}),
	],
} satisfies Config

export default config
