import { disableMetricApi } from "@/utils/features/disable-metric-api";

export async function hookBundles() {
	await waitForObject(window, "Roblox");
	disableMetricApi();

	await waitForObject(Roblox, "BundleDetector");

	Roblox.BundleDetector.jsBundlesLoaded = watchChanges(Roblox.BundleDetector.jsBundlesLoaded, (_, key) => {
		const callbacks = RobloxExtra.JSBundleCallbacks.get(key);
		if (!callbacks) return;

		for (const callback of callbacks) {
			callback();
		}
		RobloxExtra.JSBundleCallbacks.delete(key);
	});
}

export function listenForBundle(name: string, callback: (loadReason: string) => void) {
	if (Roblox.BundleDetector.jsBundlesLoaded[name]) {
		callback("already_loaded");
		return;
	}

	const jsBundleCallbacks = RobloxExtra.JSBundleCallbacks;

	if (!jsBundleCallbacks.has(name)) {
		jsBundleCallbacks.set(name, new Set());
	}
	jsBundleCallbacks.get(name)?.add(() => callback("loaded"));
}
