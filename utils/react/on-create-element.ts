import type { ConstructorHook, ReactProps } from "@/utils/react/types/hook";
import type { ReactNode } from "react";

type OnCreateElementProps = [
	string | ConstructorHook["callback"],
	ReactProps<{ [key: string]: unknown }>,
	ReactNode[],
];

export function onCreateElement([
	type,
	props,
	...children
]: OnCreateElementProps) {
	if (!(props instanceof Object)) return;
	if (props?.internal !== undefined) return;

	let render: typeof type | undefined = undefined;

	if (typeof type === "function") {
		render = type;
	} else if (typeof type === "object") {
		const component = type as object;

		if ("render" in component && typeof component.render === "function") {
			render = component.render as (...args: any[]) => unknown;
		} else if ("type" in component && typeof component.type === "function") {
			render = component.type as (...args: any[]) => unknown;
		}
	}

	if (typeof render === "function") {
		const hooks = RobloxExtra.ReactRegistry.ConstructorsHooks.filter((hook) =>
			hook.filter(props, type, ...children),
		);

		if (hooks.length > 0) {
			for (const hook of hooks) {
				render = new Proxy(render, {
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
