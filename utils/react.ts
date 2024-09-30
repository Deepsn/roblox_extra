import { onCreateElement, constructorHooks } from "@/routes/hooks/react";
import hookFunction from "./hookFunction";

// Hook react function
export default function hookReact() {
	hookFunction(React, "createElement", (createElement, react, args) => {
		try {
			args = onCreateElement(args) ?? args;
		} catch (error) {
			console.warn("createElement hook:", error);
		}

		return Reflect.apply(createElement, react, args);
	});
}

export function hookConstructor(
	filter: IConstructorHook["filter"] | IAdvancedFilter | string[],
	callback: IConstructorHook["callback"],
	manipulateResult?: IConstructorHook["manipulateResult"],
) {
	if (Array.isArray(filter)) {
		const filterArray = filter;
		filter = (props) =>
			filterArray.find((obj) => props[obj] == undefined) == undefined;
	}

	if (typeof filter === "object") {
		const filterObject = filter as IAdvancedFilter;
		filter = (props) => {
			if (filterObject.allow) {
				if (
					filterObject.allow.find((obj) => props[obj] == undefined) != undefined
				) {
					return false;
				}
			}

			if (filterObject.deny) {
				if (
					filterObject.deny.find((obj) => props[obj] != undefined) != undefined
				) {
					return false;
				}
			}

			return true;
		};
	}

	constructorHooks.push({
		filter,
		callback,
		manipulateResult,
	});
}

export function QueryElement(
	element: React.ReactElement,
	elementQuery: string | ((props: any) => boolean),
) {
	const { isValidElement } = React;

	function search(el: React.ReactElement): React.ReactElement | null {
		if (!isValidElement(el)) {
			return null;
		}

		const { props }: { props: any } = el;

		if (typeof elementQuery === "string") {
			if (props.className?.includes(elementQuery)) {
				return el;
			}
		} else if (elementQuery(props)) {
			return el;
		}

		if (props.children) {
			if (Array.isArray(props.children)) {
				for (const otherEl of props.children) {
					const resultEl = search(otherEl);

					if (resultEl) {
						return resultEl;
					}
				}
			} else if (isValidElement(props.children)) {
				const resultEl = search(props.children);

				if (resultEl) {
					return resultEl;
				}
			}
		}

		return null;
	}

	return search(element);
}
