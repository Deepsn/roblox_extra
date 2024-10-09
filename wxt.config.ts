import { readdirSync } from "node:fs";
import { defineConfig } from "wxt";

const routes = readdirSync("./entrypoints/")
	.filter((route) => route.includes("route-"))
	.map((route) => route.replace(".ts", ".js").replace("jsx", "js"));

// See https://wxt.dev/api/config.html
export default defineConfig({
	hooks: {
		"build:manifestGenerated": (wxt, manifest) => {
			if (wxt.config.mode === "development") {
				manifest.name += " (DEV)";
			}
		},
	},
	manifest: () => {
		return {
			web_accessible_resources: [
				{
					resources: routes,
					matches: ["*://*.roblox.com/*"],
				},
			],
			permissions: ["declarativeNetRequest", "webRequest", "storage"],
			host_permissions: ["*://*.roblox.com/*", "*://*.rbxcdn.com/"],
		};
	},
});
