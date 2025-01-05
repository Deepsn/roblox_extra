import { type ScriptPublicPath, injectScript } from "wxt/client";

export default defineContentScript({
	matches: ["*://*.roblox.com/*"],
	excludeMatches: ["*://*/userads/*", "*://*/user-sponsorship/*", "*://*/build/upload"],
	runAt: "document_start",
	async main() {
		const manifest = browser.runtime.getManifest();
		const webAccessibleResources = manifest.web_accessible_resources ?? [];

		const pathname = window.location.pathname.split("/")[1].trim();
		let hostname = window.location.hostname.split(".")[0].trim();

		if (hostname === "www") {
			hostname = "";
		}

		const inject = (path: ScriptPublicPath | string) => {
			const found = webAccessibleResources.some((resource) => {
				if (typeof resource === "string") {
					return resource === path;
				}

				return resource.resources.some((subresource) => subresource === path);
			});
			if (!found) return console.warn("could not find", path);

			return injectScript(path as ScriptPublicPath);
		};

		await inject("route-all.js");
		if (hostname !== "") await inject(`route-${hostname}-all.js`);
		if (pathname !== "") await inject(`route${hostname !== "" ? "-" : ""}${hostname}-${pathname}.js`);

		console.log("injected\n", `hostname: ${hostname}\n`, `pathname: ${pathname}`);
	},
});
