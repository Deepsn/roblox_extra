import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
	manifest: {
		web_accessible_resources: [
			{
				resources: ["routes/*"],
				matches: ["*://www.roblox.com/*", "*://web.roblox.com/*"],
			},
		],
	},
	
});
