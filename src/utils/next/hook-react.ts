import { hookFunction } from "@/utils/hook-function";
import { hookChunk } from "@/utils/next/hook-webpack";
import { onCreateElement } from "@/utils/react/on-create-element";
import type { ReactProps } from "@/utils/react/types/hook";

export function hookReact() {
	const hookCreateElement = (createElement: (...args: any[]) => any, react: any, args: any[]) => {
		try {
			const [type, props] = args as [any, ReactProps];
			const proxy = onCreateElement(type, props);

			if (proxy) {
				args[0] = proxy as any;
			}
		} catch (err) {
			console.error(err);
		}

		return Reflect.apply(createElement, react, args);
	};

	// 28538
	hookChunk(
		(chunk) => typeof chunk === "object" && "jsx" in chunk && "jsxs" in chunk,
		(chunk) => {
			hookFunction(chunk as any, "jsx", hookCreateElement);
			hookFunction(chunk as any, "jsxs", hookCreateElement);
		},
	);

	// 91733
	hookChunk(
		(chunk) => typeof chunk === "object" && "useState" in chunk && "useCallback" in chunk,
		(chunk) => {
			if ("createElement" in (chunk as any)) hookFunction(chunk as any, "createElement", hookCreateElement);
			window.React = chunk as any;
		},
	);
}
