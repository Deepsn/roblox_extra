import { readdirSync } from "node:fs";
import { defineConfig } from "wxt";

const routes = readdirSync("./entrypoints/")
	.filter((route) => route.includes("route-"))
	.map((route) => route.replace(".ts", ".js"));

// See https://wxt.dev/api/config.html
export default defineConfig({
	manifest: () => {
		return {
			web_accessible_resources: [
				{
					resources: routes,
					matches: ["*://*.roblox.com/*"],
				},
			],
		};
	},
});
