import { listenForBundle } from "@/utils/bundle/hook-bundles";

export async function waitForBundle(name: string) {
	await waitForObject(window, "Roblox");
	await waitForObject(Roblox, "BundleDetector");

	return new Promise<void>((resolve) => {
		listenForBundle(name, resolve);
	});
}
