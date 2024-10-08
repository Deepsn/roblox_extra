import type { CoreUtilities as _CoreUtilities } from "@/types/core-utilities";
import type { ReactStyleGuide as _RobloxStyleGuide } from "@/types/react-style-guide";
import type { RobloxThumbnails as _RobloxThumbnails } from "@/types/roblox-thumbnails";
import type { ConstructorHook } from "@/utils/react/types/hook";

export declare global {
	const Roblox: Roblox;
	const React: typeof import("react") & {
		__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: any;
	};

	const RobloxExtra: RobloxExtra;
	const ReactStyleGuide: _RobloxStyleGuide;
	const RobloxThumbnails: _RobloxThumbnails;
	const CoreUtilities: _CoreUtilities;

	const useEffect: typeof import("react").useEffect;
	const useLayoutEffect: typeof import("react").useLayoutEffect;
	const useState: typeof import("react").useState;
	const useCallback: typeof import("react").useCallback;
	const useContext: typeof import("react").useContext;
	const createContext: typeof import("react").createContext;

	interface Window {
		RobloxThumbnails: _RobloxThumbnails;
		CoreUtilities: _CoreUtilities;
		Roblox: Roblox;
		RobloxExtra: RobloxExtra;
		React: typeof import("react");
		ReactDOM: typeof import("react-dom");
		ReactStyleGuide: _RobloxStyleGuide;
		useEffect: typeof import("react").useEffect;
		useLayoutEffect: typeof import("react").useLayoutEffect;
		useState: typeof import("react").useState;
		useCallback: typeof import("react").useCallback;
		useContext: typeof import("react").useContext;
		createContext: typeof import("react").createContext;
	}

	interface RobloxExtra {
		ReactRegistry: {
			ConstructorsHooks: ConstructorHook[];
		};
	}
}
