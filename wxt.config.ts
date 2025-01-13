import vsixPlugin from "@codingame/monaco-vscode-rollup-vsix-plugin";
import { readdirSync } from "node:fs";
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";
import { defineConfig } from "wxt";

const routes = readdirSync("./entrypoints/")
	.filter((route) => route.includes("route-"))
	.map((route) => route.replace(".ts", ".js").replace("jsx", "js"));

// See https://wxt.dev/api/config.html
export default defineConfig({
	modules: ["@wxt-dev/module-vue"],
	hooks: {
		"build:manifestGenerated": (wxt, manifest) => {
			if (wxt.config.mode === "development") {
				manifest.name += " (DEV)";
			}
		},
	},
	manifest: () => {
		return {
			name: "Roblox extra",
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
	vite: () => ({
		plugins: [wasm(), topLevelAwait(), vsixPlugin()],
		optimizeDeps: {
			exclude: ["@codingame/monaco-vscode-theme-defaults-default-extension"],
			include: ["vscode-textmate", "vscode-oniguruma"],
		},
	}),
});
