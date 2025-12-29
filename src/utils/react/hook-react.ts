import type { ReactElement } from "react";
import { Logger } from "@/utils/helpers/logger";
import { hookFunction } from "@/utils/hook-function";
import { onCreateElement } from "@/utils/react/on-create-element";

const logger = new Logger("ReactHook", "#61DAFB");

// roblox.com react 17.0.2
type React17 = typeof import("react");

export function hookReact() {
	const hookCreateElement = (
		createElement: React17["createElement"] | (typeof ReactJSX)["jsx"] | (typeof ReactJSX)["jsxs"],
		react: React17 | typeof ReactJSX,
		args:
			| Parameters<React17["createElement"]>
			| Parameters<(typeof ReactJSX)["jsx"]>
			| Parameters<(typeof ReactJSX)["jsxs"]>,
	) => {
		const result = Reflect.apply(createElement, react, args) as ReactElement;

		try {
			logger.debug("createElement", args);
			const type = result.type;
			const proxy = onCreateElement(type, result.props);
			if (proxy) {
				result.type = proxy;
			}
		} catch (err) {
			logger.error(err);
		}

		return result;
	};

	hookFunction(React as React17, "createElement", hookCreateElement);
	hookFunction(ReactJSX, "jsx", hookCreateElement);
	hookFunction(ReactJSX, "jsxs", hookCreateElement);
}
