import type { Options, ServerCursor, ServerInstance } from "@/types/games";
import { sendMessagesOnInjected } from "@/utils/messaging/injected";
import type { ServerRegion } from "@/utils/messaging/server-info";
import type { ConstructorHook } from "@/utils/react/types/hook";

export const RunningGameServers: ConstructorHook["callback"] = (
	target,
	self,
	args,
) => {
	const [props] = args;

	const lastRequest = useRef(undefined);
	const original_getGameServers = props.getGameServers;

	const { createSystemFeedback } = ReactStyleGuide;
	const [SystemFeedback, systemFeedbackService] = useMemo(
		() => createSystemFeedback(),
		[],
	);

	props.getGameServers = async (
		placeId: number,
		cursor: ServerCursor,
		options: Options,
	) => {
		const serversRequest = await original_getGameServers(placeId, cursor, {
			...options,
			selectedRegion: undefined,
		}).catch(() => {
			systemFeedbackService.warning(
				"Unable to get servers, please again try later.",
			);
			return lastRequest.current;
		});
		const { data: servers } = serversRequest;

		if (options.selectedRegion) {
			servers.data = (
				await Promise.all(
					servers.data.map(async (server: ServerInstance) => {
						const serverRegion = await sendMessagesOnInjected(
							"getServerRegion",
							{
								placeId: placeId.toString(),
								gameId: server.id,
							},
						).catch((err) => {
							console.log("Failed to fetch server region");
							return undefined;
						});

						server.region = serverRegion;
						return server;
					}),
				)
			).filter(
				(server: ServerInstance & { region: ServerRegion | undefined }) => {
					return server.region?.region.location.includes(
						// biome-ignore lint/style/noNonNullAssertion: selectedRegion is guaranteed to exist here
						options.selectedRegion!,
					);
				},
			);
		}

		if (servers) {
			lastRequest.current = serversRequest;
		}

		return serversRequest;
	};

	return (
		<>
			<SystemFeedback />
			{Reflect.apply(target, self, args)}
		</>
	);
};
