import type { ElementType, JSXElementConstructor, ReactElement, ReactNode } from "react";
import type { ReactProps } from "@/utils/react/types/hook";

const elementCache = new Map<any, any>();

export function onCreateElement(type: ElementType | string, props: ReactProps) {
	if (!(props instanceof Object)) return;

	let render: ((...args: any[]) => ReactElement | ReactNode) | JSXElementConstructor<any> | undefined;

	if (typeof type === "function") {
		render = type;
	} else if (typeof type === "object") {
		const component = type as object;

		if ("render" in component && typeof component.render === "function") {
			render = component.render as (...args: any[]) => ReactElement | ReactNode;
		} else if ("type" in component && typeof component.type === "function") {
			render = component.type as (...args: any[]) => ReactElement | ReactNode;
		}
	}

	if (!render) return;

	const hooks = RobloxExtra.ReactRegistry.ConstructorsHooks.filter((hook) => hook.filter(props));
	if (hooks.length === 0) return;

	const cache = elementCache.get(render);
	if (cache) return cache as typeof render;

	let proxy = render;

	for (const hook of hooks) {
		proxy = new Proxy(proxy, {
			apply: (target, self, args) => {
				const props = args[0] as ReactProps<Record<string, unknown>>;
				const render = () => Reflect.apply(target, self, args);

				if (!hook.manipulateResult) {
					const element = render();
					return hook.callback(element, props) ?? element;
				}

				return hook.callback(render, props);
			},
		});
	}

	elementCache.set(render, proxy);
	return proxy;
}
