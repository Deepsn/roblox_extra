export declare global {
	const Roblox: Roblox;
	const React: React;
	const RobloxExtra: RobloxExtra;

	interface Window {
		RobloxThumbnails: RobloxThumbnails;
		Roblox: Roblox;
		RobloxExtra: RobloxExtra;
		React: typeof import("react");
		ReactDOM: typeof import("react-dom");
	}

	interface RobloxExtra {
		ReactRegistry: {
			ConstructorsHooks: ConstructorHook[];
		};
	}
}
