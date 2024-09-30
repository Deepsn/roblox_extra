import { constructorHooks } from "@/utils/react/hooks";
import type React from "react";

type OnCreateElementProps = [
	string | ConstructorHook["callback"],
	ReactProps<{ [key: string]: unknown }>,
	React.ReactNode[],
];

export function onCreateElement([
	type,
	props,
	...children
]: OnCreateElementProps) {
	if (!(props instanceof Object)) return;
	if (props?.internal !== undefined) return;

	if (typeof type === "function") {
		const hooks = constructorHooks.filter((hook) =>
			hook.filter(props, type, ...children),
		);

		if (hooks.length > 0) {
			for (const hook of hooks) {
				type = new Proxy(type, {
					apply: (target, self, args) => {
						let result = [target, self];

						if (!hook.manipulateResult) {
							result = [Reflect.apply(target, self, args)];
						}

						return hook.callback(...result, args) ?? result;
					},
				});
			}
		}
	}

	return [type, props, ...children];
}
