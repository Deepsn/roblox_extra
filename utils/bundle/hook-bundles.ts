import { disableMetricApi } from "@/utils/features/disable-metric-api";

const jsBundlesLoaded = new Map<string, Set<() => void>>();

export async function hookBundles() {
	await waitForObject(window, "Roblox");
	disableMetricApi();

	await waitForObject(Roblox, "BundleDetector");

	Roblox.BundleDetector.jsBundlesLoaded = watchChanges(
		Roblox.BundleDetector.jsBundlesLoaded,
		(_, key) => {
			console.log("jsBundlesLoaded changed:", key);

			const callbacks = jsBundlesLoaded.get(key);
			if (!callbacks) return;

			for (const callback of callbacks) {
				callback();
			}
			jsBundlesLoaded.delete(key);
		},
	);
}

export function listenForBundle(name: string, callback: () => void) {
	if (Roblox.BundleDetector.jsBundlesLoaded[name]) {
		callback();
		return;
	}

	if (!jsBundlesLoaded.has(name)) {
		jsBundlesLoaded.set(name, new Set());
	}
	jsBundlesLoaded.get(name)?.add(callback);
}
