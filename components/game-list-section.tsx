import { queryElement } from "@/utils/react/query-element";
import type { ConstructorHook } from "@/utils/react/types/hook";
import type { ReactElement } from "react";

export const GameListSection: ConstructorHook["callback"] = (
	target,
	self,
	args,
) => {
	const [props] = args;
	const { type } = props;

	if (type !== "") return;

	const element = Reflect.apply(target, self, args) as ReactElement;

	useEffect(() => {
		const serverContainerReact = queryElement(element, "server-item-container");
		const id = serverContainerReact?.props.id as string | undefined;

		if (!id) return;

		for (const server of serverContainerReact?.props.children ?? []) {
			const id = server.props.id;
			const gameInstance = props.gameInstances.find(
				(instance: Record<string, unknown>) => instance.id === id,
			);
			if (!gameInstance) continue;

			server.props.ping = gameInstance.ping;
			server.props.fps = gameInstance.fps;
		}

		const serverContainer = $<HTMLUListElement>(`#${id}`);

		serverContainer.css("display", "flex");
		serverContainer.css("flex-direction", "column");
		serverContainer.css("gap", "12px");
		serverContainer.css("flex-flow", "wrap");
	}, [element]);

	return element;
};
