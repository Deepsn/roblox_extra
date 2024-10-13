import type { ServerFilterOptions } from "@/components/server-list-filters";
import type { ServerCursor } from "@/types/games";
import type { ConstructorHook } from "@/utils/react/types/hook";
import { getBestPingServers } from "@/utils/server/filters/best-ping";

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
		options: ServerFilterOptions,
	) => {
		const serversRequest = await original_getGameServers(
			placeId,
			cursor,
			options,
		).catch((err: { status: number }) => {
			if (err.status !== 429) {
				systemFeedbackService.warning(
					"Unable to get servers, please again try later.",
				);
				console.error(err);
			}

			return lastRequest.current;
		});

		const { data: servers } = serversRequest;
		const filters = [{ name: "bestPing", filter: getBestPingServers }];

		for (const { name, filter } of filters) {
			if (!options.filters?.includes(name)) continue;
			servers.data = filter(servers.data);
		}

		console.log(servers.data, options);

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
