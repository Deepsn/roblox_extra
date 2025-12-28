import { listenForBundle } from "@/utils/bundle/hook-bundles";
import { Logger } from "@/utils/helpers/logger";

const logger = new Logger("BundleLoad", "#FFA500");

export async function waitForBundle(name: string) {
	await waitForObject(window, "Roblox");
	await waitForObject(Roblox, "BundleDetector");

	return new Promise<void>((resolve) => {
		listenForBundle(name, (loadReason) => {
			resolve();
			logger.info(`Bundle ${loadReason}: ${name}`);
		});
	});
}
