import { useAsyncEffect } from "@/hooks/use-async-effect";
import { useUpdate } from "@/hooks/use-update";
import { sendMessagesOnInjected } from "@/utils/messaging/injected";
import type { ConstructorHook } from "@/utils/react/types/hook";

export const GameInstanceCard: ConstructorHook["callback"] = (
	target,
	self,
	args,
) => {
	const [props] = args;
	const update = useUpdate();

	useAsyncEffect(async () => {
		const serverInfo = await sendMessagesOnInjected("getServerInfo", {
			placeId: props.placeId,
			gameId: props.id,
		});

		console.log("Server info", serverInfo);
		if (!serverInfo) return;

		props.gameServerStatus = `region: ${serverInfo.region.location} - ${serverInfo.region.country}`;
		update();
	}, []);
	// console.log(props);

	return Reflect.apply(target, self, args);
};
