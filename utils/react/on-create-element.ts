import type { ReactProps } from "@/utils/react/types/hook";
import type { JSXElementConstructor, ReactElement } from "react";

const constructorProxies = new Map<any, { [key: string]: any }>();

export function onCreateElement(
	type: string | JSXElementConstructor<any>,
	props: ReactProps<{ [key: string]: unknown }>,
) {
	if (!(props instanceof Object)) return;
	if (props?.internal !== undefined) return;

	let render:
		| ((...args: any[]) => ReactElement | unknown)
		| JSXElementConstructor<any>
		| undefined = undefined;

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

	if (!render) return;

	const hooks = RobloxExtra.ReactRegistry.ConstructorsHooks.filter((hook) =>
		hook.filter(props, render),
	);

	let cache = constructorProxies.get(type);

	if (!cache) {
		cache = {};
		constructorProxies.set(type, cache);
	}

	const key = hooks.map((x) => x.index).join("");
	let proxy = cache[key];

	if (!proxy) {
		proxy = render;

		for (const hook of hooks) {
			proxy = new Proxy(proxy, {
				apply: (target, self, args) => {
					let result = [target, self, args];

					if (!hook.manipulateResult) {
						result = [Reflect.apply(target, self, args)];
					}

					return hook.callback(...result) ?? Reflect.apply(target, self, args);
				},
			});
		}

		cache[key] = proxy;
	}

	return proxy;
}
