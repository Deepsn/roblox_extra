import type { ExtendedServerOptions } from "@/components/server-list-options";
import type { ServerCursor, ServerInstance, ServerInstancesResponse } from "@/types/games";
import { sendMessagesOnInjected } from "@/utils/messaging/injected";
import type { ServerRegion } from "@/utils/messaging/server-info";
import type { ConstructorHook } from "@/utils/react/types/hook";
import { getBestPingServers } from "@/utils/server/filters/best-ping";

export const RunningGameServers: ConstructorHook["callback"] = (target, self, args) => {
	const [props] = args;

	const lastRequest = useRef<{ data: ServerInstancesResponse }>();
	const original_getGameServers = useMemo(() => props.getGameServers, []);

	const { createSystemFeedback } = ReactStyleGuide;
	const [SystemFeedback, systemFeedbackService] = useMemo(() => createSystemFeedback(), []);

	async function getServerInstances(
		placeId: number,
		cursor: ServerCursor,
		options: ExtendedServerOptions,
		isExtended?: boolean,
	) {
		const serversRequest: { data: ServerInstancesResponse } = await original_getGameServers(
			placeId,
			cursor,
			options,
		).catch((err: { status: number }) => {
			if (isExtended) return undefined;

			if (err.status !== 429) {
				systemFeedbackService.warning("Unable to get servers, please again try later.");
				console.error(err);
			}

			return lastRequest.current;
		});

		const { data: servers } = serversRequest ?? { data: undefined };

		if (!isExtended && ((options.filters?.length ?? 0) > 0 || options.selectedRegion)) {
			const filters = [{ name: "bestPing", filter: getBestPingServers }];

			let serversFound = [] as ServerInstance[];
			let nextCursor = "" as string | undefined;

			while (serversFound.length < 10 && nextCursor !== null) {
				// Get more servers
				const newServersRequest = await getServerInstances(
					placeId,
					nextCursor,
					{ ...options, limit: "100" },
					true,
				).catch(() => undefined);

				if (!newServersRequest) {
					console.log("cancelling...");
					await new Promise((resolve) => setTimeout(resolve, 3000));
					continue;
				}

				const { data: newServers } = newServersRequest;
				nextCursor = newServers.nextPageCursor;

				// Add to list
				serversFound.push(...newServers.data);

				// Filter duplicates
				serversFound = serversFound.filter((server, index, self) => {
					return self.findIndex((s) => s.id === server.id) === index;
				});

				for (const { name, filter } of filters) {
					if (!options.filters?.includes(name)) continue;
					serversFound = filter(serversFound);
				}

				if (options.selectedRegion) {
					const serversRegion = await Promise.all(
						serversFound.map(async (server) => {
							const region = await sendMessagesOnInjected("getServerRegion", {
								placeId: placeId.toString(),
								gameId: server.id,
							});
							server.region = region;
							return server;
						}),
					);

					serversFound = serversRegion.filter((server) => {
						const region = server.region as ServerRegion | undefined;
						const selectedRegion = options.selectedRegion?.toLowerCase();
						if (!region || !selectedRegion) return false;

						return (
							region.location.toLowerCase().includes(selectedRegion) ||
							region.country.toLowerCase().includes(selectedRegion)
						);
					});
				}
			}

			servers.data = serversFound;
		}

		if (servers && !isExtended) {
			lastRequest.current = serversRequest;
		}

		return serversRequest;
	}

	props.getGameServers = (placeId: number, cursor: ServerCursor, options: ExtendedServerOptions) =>
		getServerInstances(placeId, cursor, options, false);

	return (
		<>
			<SystemFeedback />
			{Reflect.apply(target, self, args)}
		</>
	);
};
