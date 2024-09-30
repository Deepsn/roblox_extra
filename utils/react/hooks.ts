import { onCreateElement } from "@/utils/react/on-create-element";

export const constructorHooks = [] as ConstructorHook[];

export function hookReact() {
	hookFunction(React, "createElement", (createElement, react, args) => {
		let modifiedArgs: typeof args;

		try {
			modifiedArgs = onCreateElement(args);
		} catch (error) {
			console.warn("createElement hook:", error);
		}

		return Reflect.apply(createElement, react, modifiedArgs ?? args);
	});
}
