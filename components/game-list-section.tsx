import { queryElement } from "@/utils/react/query-element";
import type { ReactElement } from "react";

export function GameListSection(
	element: ReactElement,
	props: Record<string, unknown>,
) {
	const { type } = props;

	if (type !== "") return;

	useEffect(() => {
		const serverContainerReact = queryElement(element, "server-item-container");
		const id = serverContainerReact?.props.id as string | undefined;
		if (!id) return;

		const serverContainer = $<HTMLUListElement>(`#${id}`);

		serverContainer.css("display", "flex");
		serverContainer.css("flex-direction", "column");
		serverContainer.css("gap", "12px");
		serverContainer.css("flex-flow", "wrap");

		console.log("element", serverContainerReact, props, serverContainer);
	}, [element]);

	return element;
}
