import type { ReactElement } from "react";
import { Logger } from "@/utils/helpers/logger";
import { hookFunction } from "@/utils/hook-function";
import { onCreateElement } from "@/utils/react/on-create-element";

const logger = new Logger("ReactHook", "#61DAFB");

export function hookReact() {
	const hookCreateElement = (
		createElement: (typeof React)["createElement"] | (typeof ReactJSX)["jsx"] | (typeof ReactJSX)["jsxs"],
		react: typeof React | typeof ReactJSX,
		args:
			| Parameters<(typeof React)["createElement"]>
			| Parameters<(typeof ReactJSX)["jsx"]>
			| Parameters<(typeof ReactJSX)["jsxs"]>,
	) => {
		const result = Reflect.apply(createElement, react, args) as ReactElement;

		try {
			logger.debug("createElement", args[1] ?? args[0]);
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

	hookFunction(React, "createElement", hookCreateElement);
	hookFunction(ReactJSX, "jsx", hookCreateElement);
	hookFunction(ReactJSX, "jsxs", hookCreateElement);
}
