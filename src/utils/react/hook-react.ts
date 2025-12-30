import type { ElementType, ReactElement } from "react";
import type { ReactJSX } from "@/types/global-window";
import { Logger } from "@/utils/helpers/logger";
import { hookFunction } from "@/utils/hook-function";
import { onCreateElement } from "@/utils/react/on-create-element";
import type { ReactProps } from "@/utils/react/types/hook";

const logger = new Logger("ReactHook", "#61DAFB");

// roblox.com react 17.0.2
type React17 = typeof import("react");

export function hookReact() {
	const hookCreateElement = (
		createElement: React17["createElement"] | ReactJSX["jsx"] | ReactJSX["jsxs"],
		react: React17 | ReactJSX,
		args: Parameters<React17["createElement"]> | Parameters<ReactJSX["jsx"]> | Parameters<ReactJSX["jsxs"]>,
	): ReactElement => {
		const [type, props] = args as [ElementType | string, ReactProps];

		try {
			logger.debug("createElement", args);
			const proxy = onCreateElement(type, props as ReactProps);

			if (proxy) {
				args[0] = proxy as ElementType;
			}
		} catch (err) {
			logger.error(err, typeof type);
		}

		return Reflect.apply(createElement, react, args);
	};

	hookFunction(React as React17, "createElement", hookCreateElement);
	hookFunction(ReactJSX, "jsx", hookCreateElement);
	hookFunction(ReactJSX, "jsxs", hookCreateElement);
}
