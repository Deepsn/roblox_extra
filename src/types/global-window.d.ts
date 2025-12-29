import type { CoreUtilities as _CoreUtilities } from "@/types/core-utilities";
import type { ReactStyleGuide as _RobloxStyleGuide } from "@/types/react-style-guide";
import type { ReactUtilities as _ReactUtilities } from "@/types/react-utilities";
import type { RobloxThumbnails as _RobloxThumbnails } from "@/types/roblox-thumbnails";
import type { ConstructorHook } from "@/utils/react/types/hook";

type React = typeof import("react") & typeof import("react-create");

type ExtractReactHooks<T = React> = {
	[K in keyof T as K extends `use${string}` ? (T[K] extends (...args: any[]) => any ? K : never) : never]: T[K];
};

type ReactHooks = ExtractReactHooks<React>;

export declare global {
	const Roblox: Roblox;
	const React: React & {
		__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: any;
	};

	const ReactJSX: typeof import("react/jsx-runtime") | typeof import("react-create/jsx-runtime");

	const ReactStyleGuide: _RobloxStyleGuide;
	const ReactUtilities: _ReactUtilities;

	const RobloxExtra: RobloxExtra;
	const RobloxThumbnails: _RobloxThumbnails;
	const CoreUtilities: _CoreUtilities;

	const useEffect: ReactHooks["useEffect"];
	const useLayoutEffect: ReactHooks["useLayoutEffect"];
	const useState: ReactHooks["useState"];
	const useCallback: ReactHooks["useCallback"];
	const useContext: ReactHooks["useContext"];
	const useMemo: ReactHooks["useMemo"];
	const useRef: ReactHooks["useRef"];
	const createContext: React["createContext"];

	interface Window {
		RobloxExtra: RobloxExtra;

		// roblox.com
		RobloxThumbnails: _RobloxThumbnails;
		CoreUtilities: _CoreUtilities;
		Roblox: Roblox;
		React: React;
		ReactDOM: typeof import("react-dom") & typeof import("react-dom-create");
		ReactStyleGuide: _RobloxStyleGuide;

		useEffect: React.useEffect;
		useLayoutEffect: React.useLayoutEffect;
		useState: React.useState;
		useCallback: React.useCallback;
		useContext: React.useContext;
		useMemo: React.useMemo;
		useRef: React.useRef;
		createContext: React.createContext;

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
