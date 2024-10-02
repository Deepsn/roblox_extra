import type { ConstructorHook } from "@/utils/react/types/hook";

export declare global {
	const Roblox: Roblox;
	const React: typeof import("react") & {
		__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: any;
	};
	const RobloxExtra: RobloxExtra;
	const useEffect: typeof import("react").useEffect;

	interface Window {
		RobloxThumbnails: RobloxThumbnails;
		Roblox: Roblox;
		RobloxExtra: RobloxExtra;
		React: typeof import("react");
		ReactDOM: typeof import("react-dom");
		useEffect: typeof import("react").useEffect;
	}

	interface RobloxExtra {
		ReactRegistry: {
			ConstructorsHooks: ConstructorHook[];
		};
	}
}
