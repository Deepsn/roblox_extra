import type { ScriptPublicPath } from "wxt/utils/inject-script";
import { Logger } from "@/utils/helpers/logger";

const logger = new Logger("Injector", "#6eafdbff");

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

		const inject = async (path: ScriptPublicPath | string) => {
			const found = webAccessibleResources.some((resource) => {
				if (typeof resource === "string") {
					return resource === path;
				}

				return resource.resources.some((subresource) => subresource === path);
			});
			if (!found) return logger.warn("could not find", path);

			return injectScript(path as ScriptPublicPath, {
				modifyScript(script) {
					// Fixes scripts sometimes being delayed when injected
					script.async = false;
				},
			});
		};

		const injectall = Promise.all([
			inject("route-all.js"),
			hostname !== "" ? inject(`route-${hostname}-all.js`) : undefined,
			pathname !== "" ? inject(`route${hostname !== "" ? "-" : ""}${hostname}-${pathname}.js`) : undefined,
		]);

		await injectall;

		logger.log("injected\n", `hostname: "${hostname}"\n`, `pathname: "${pathname}"`);
	},
});
