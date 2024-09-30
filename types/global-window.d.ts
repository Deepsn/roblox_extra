export declare global {
	const Roblox: Roblox;
	const React: React;

	interface Window {
		RobloxThumbnails: RobloxThumbnails;
		Roblox: Roblox;
		React: typeof import("react");
		ReactDOM: typeof import("react-dom");
	}
}
