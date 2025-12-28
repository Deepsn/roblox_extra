import type React from "react";
import type { ReactElement } from "react";
import type ReactJSX from "react/jsx-runtime";
import { hookChunk } from "@/utils/next/hook-webpack";
import { onCreateElement } from "@/utils/react/on-create-element";

export function hookReact() {
	const hook = (createElement: (...args: any[]) => ReactElement, react: typeof ReactJSX, args: unknown[]) => {
		const result = Reflect.apply(createElement, react, args) as ReactElement;

		try {
			const type = result.type;
			const proxy = onCreateElement(type, result.props);

			if (proxy) {
				if (typeof type === "function") {
					result.type = proxy;
				} else if (typeof type === "object" && type !== null && "render" in type) {
					(type as { render: typeof result.type }).render = proxy;
				}
			}
		} catch (err) {
			console.error(err);
		}

		return result;
	};

	// 28538
	hookChunk(
		(chunk) => "jsx" in chunk && "jsxs" in chunk,
		(chunk, id) => {
			console.log("React JSX chunk", chunk, id);
			hookFunction(chunk, "jsx", hook);
			hookFunction(chunk, "jsxs", hook);
		},
	);

	// 91733
	hookChunk(
		(chunk) => "useState" in chunk && "useCallback" in chunk,
		(chunk, id) => {
			console.log("React chunk", chunk, id);
			window.React = chunk as unknown as typeof React;
		},
	);
}
