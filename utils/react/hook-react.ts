import { hookFunction } from "@/utils/hook-function";
import { onCreateElement } from "@/utils/react/on-create-element";
import type { ReactElement } from "react";

export function hookReact() {
	hookFunction(React, "createElement", (createElement, react, args) => {
		const result = Reflect.apply(createElement, react, args) as ReactElement;

		try {
			const type = result.type;
			const proxy = onCreateElement(type, result.props);

			if (proxy) {
				result.type = proxy;
			}
		} catch (err) {
			console.error(err);
		}

		return result;
	});
}
