import type { ReactElement } from "react";
import { hookChunk } from "@/utils/next/hook-chunk";
import type { Chunk, Module } from "@/utils/next/types/chunk-hook";
import { onCreateElement } from "@/utils/react/on-create-element";

export function hookNextReact() {
	const hook = (createElement: (...args: [Module]) => any, react: Chunk, args: [Module]) => {
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

	hookChunk(
		(chunk) => "jsx" in chunk && "jsxs" in chunk,
		(chunk) => {
			console.log("React chunk", chunk);
			hookFunction(chunk, "jsx" as string, hook);
			hookFunction(chunk, "jsxs" as string, hook);
		},
	);

	hookChunk(
		(chunk) => "useState" in chunk && "useCallback" in chunk,
		(chunk) => {
			console.log("React chunk", chunk);
			window.React = chunk as unknown as typeof React;
		},
	);
}
