import { type ScriptPublicPath, injectScript } from "wxt/client";

export default defineContentScript({
	matches: ["*://*.roblox.com/*"],
	excludeMatches: [
		"*://*/userads/*",
		"*://*/user-sponsorship/*",
		"*://*/build/upload",
	],
	runAt: "document_start",
	async main() {
		const url = window.location.pathname.split("/")[1];
		console.log("injecting", url);
		await injectScript("/route-all.js");
		await injectScript(`route-${url}.js` as ScriptPublicPath);
		console.log("injected", url);
	},
});
