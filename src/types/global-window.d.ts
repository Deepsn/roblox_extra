import type { CoreUtilities as _CoreUtilities } from "@/types/core-utilities";
import type { ReactStyleGuide as _RobloxStyleGuide } from "@/types/react-style-guide";
import type { ReactUtilities as _ReactUtilities } from "@/types/react-utilities";
import type { RobloxThumbnails as _RobloxThumbnails } from "@/types/roblox-thumbnails";
import type { ConstructorHook } from "@/utils/react/types/hook";

export declare global {
	const Roblox: Roblox;
	const React: typeof import("react") & {
		__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: any;
	};

	const ReactJSX: typeof import("react/jsx-runtime");

	const ReactStyleGuide: _RobloxStyleGuide;
	const ReactUtilities: _ReactUtilities;

	const RobloxExtra: RobloxExtra;
	const RobloxThumbnails: _RobloxThumbnails;
	const CoreUtilities: _CoreUtilities;

	const useEffect: typeof import("react").useEffect;
	const useLayoutEffect: typeof import("react").useLayoutEffect;
	const useState: typeof import("react").useState;
	const useCallback: typeof import("react").useCallback;
	const useContext: typeof import("react").useContext;
	const useMemo: typeof import("react").useMemo;
	const useRef: typeof import("react").useRef;
	const createContext: typeof import("react").createContext;

	interface Window {
		RobloxExtra: RobloxExtra;

		// roblox.com
		RobloxThumbnails: _RobloxThumbnails;
		CoreUtilities: _CoreUtilities;
		Roblox: Roblox;
		React: typeof import("react");
		ReactDOM: typeof import("react-dom");
		ReactStyleGuide: _RobloxStyleGuide;
		useEffect: typeof import("react").useEffect;
		useLayoutEffect: typeof import("react").useLayoutEffect;
		useState: typeof import("react").useState;
		useCallback: typeof import("react").useCallback;
		useContext: typeof import("react").useContext;
		useMemo: typeof import("react").useMemo;
		useRef: typeof import("react").useRef;
		createContext: typeof import("react").createContext;

		// create.roblox.com
		webpackChunk_N_E: any;
	}

	interface RobloxExtra {
		ObjectDefineHooks: Map<string, { key: string; callback: (...args: any[]) => void }[]>;
		ReactRegistry: {
			ConstructorsHooks: ConstructorHook[];
		};
		JSBundleCallbacks: Map<string, Set<() => void>>;
	}
}
