import vsixPlugin from "@codingame/monaco-vscode-rollup-vsix-plugin";
import { readdirSync } from "node:fs";
import wasm from "vite-plugin-wasm";
import { defineConfig } from "wxt";

const routes = readdirSync("./src/entrypoints/")
	.filter((route) => route.includes("route-"))
	.map((route) => route.replace(".ts", ".js").replace("jsx", "js"));

// See https://wxt.dev/api/config.html
export default defineConfig({
	srcDir: "src",
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
			content_security_policy: {
				extension_pages: "script-src 'self' 'wasm-unsafe-eval'",
			},
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
		worker: {
			format: "es",
		},
		build: {
			target: "ES2022",
		},
		plugins: [wasm(), vsixPlugin()],
		optimizeDeps: {
			exclude: [
				"@codingame/monaco-vscode-theme-defaults-default-extension",
				"@codingame/monaco-vscode-theme-seti-default-extension",
				"@codingame/monaco-vscode-json-default-extension",
				"@codingame/monaco-vscode-json-language-features-default-extension",
			],
			include: ["vscode-textmate", "vscode-oniguruma"],
		},
	}),
});
