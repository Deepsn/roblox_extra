export function setupRobloxExtra() {
	window.RobloxExtra = {
		ObjectDefineHooks: new Map(),
		ReactRegistry: {
			ConstructorsHooks: [],
		},
		JSBundleCallbacks: new Map<string, Set<() => void>>(),
	};
}

export function waitForRobloxExtra(): Promise<RobloxExtra> {
	return waitForObject(window, "RobloxExtra");
}
