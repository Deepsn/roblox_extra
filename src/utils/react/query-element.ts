import type { ReactElement } from "react";

export function queryElement(element: ReactElement, elementQuery: string | ((props: any) => boolean)) {
	const { isValidElement } = React;

	function search(el: ReactElement): ReactElement | undefined {
		if (!isValidElement(el)) {
			return;
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

		return;
	}

	return search(element);
}
