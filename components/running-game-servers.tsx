import type { Options, ServerCursor, ServerInstance } from "@/types/games";
import { sendMessagesOnInjected } from "@/utils/messaging/injected";
import type { ConstructorHook } from "@/utils/react/types/hook";

export const RunningGameServers: ConstructorHook["callback"] = (
	target,
	self,
	args,
) => {
	const [props] = args;
	const update = useUpdate();

	useEffect(() => {
		const original_getGameServers = props.getGameServers;
		let depth = 0;

		async function filter(servers: ServerInstance[], placeId: number) {
			return (
				await Promise.all(
					servers.map(async (server) => {
						const location = await sendMessagesOnInjected("getServerInfo", {
							placeId: placeId.toString(),
							gameId: server.id,
						});

						return { ...server, location };
					}),
				)
			).filter((server) =>
				server.location ? server.location.region.country === "BR" : false,
			);
		}

		async function getGameServers(
			placeId: number,
			cursor: ServerCursor,
			options: Options,
		) {
			let serversRequest = await original_getGameServers(placeId, cursor, {
				...options,
				limit: 100,
			});
			const {
				data,
			}: {
				data: (ServerInstance & {
					location: {
						ip: string;
						region: { country: string; location: string };
					};
				})[];
			} = serversRequest.data;

			if (data.length > 0) {
				serversRequest.data.data = await filter(
					serversRequest.data.data,
					placeId,
				);

				let req = serversRequest;

				while (
					req.config.url.includes("Public") &&
					req.data.data.length === 0 &&
					req.data.nextPageCursor
				) {
					console.log("retrying...", depth, serversRequest.data.nextPageCursor);

					if (depth > 400) {
						break;
					}

					depth += 1;
					console.log("waiting");

					await new Promise((resolve) => {
						setTimeout(resolve, 2000);
					});
					console.log("getting...");

					req = await getGameServers(
						placeId,
						serversRequest.data.nextPageCursor,
						{
							...options,
							limit: 100,
						},
					);
					if (!req) break;
					req = await filter(req, placeId);
				}

				console.log("finished");

				serversRequest = req;
			}

			console.log("getting game servers", placeId, options, serversRequest);

			return serversRequest;
		}
		props.getGameServers = getGameServers;
		update();
	}, []);

	return Reflect.apply(target, self, args);
};
