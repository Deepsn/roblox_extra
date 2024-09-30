import { onCreateElement, constructorHooks } from "@/routes/hooks/react";
import hookFunction from "./hookFunction";

// Hook react function

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
