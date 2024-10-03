import { GameInstanceCard } from "@/components/game-instance-card";
import { hookConstructor } from "@/utils/react/hook-constructor";

// const RunningGameServers: ConstructorHook["callback"] = (
// 	target,
// 	self,
// 	args,
// ) => {
// 	const [props] = args;

// 	const getGameServers = props.getGameServers;

// 	props.getGameServers = async (
// 		placeId: number,
// 		cursor: ServerCursor,
// 		options: IOptions,
// 	) => {
// 		const serversRequest = await getGameServers(placeId, cursor, options);
// 		const { data }: { data: IGameServer[] } = serversRequest.data;

// 		serversRequest.data.data = data.filter(
// 			(server) =>
// 				server.playing <= (options.maxPlayers ?? server.maxPlayers + 1),
// 		);

// 		console.log("getting game servers", placeId, options, serversRequest);

// 		serversRequest.data.data = data.map((server) => ({
// 			...server,
// 			playing: 3333,
// 		}));

// 		return serversRequest;
// 	};

// 	return Reflect.apply(target, self, args);
// };

export default defineUnlistedScript(async () => {
	console.log("loading react");

	await waitForObject(window, "React");

	console.log("react loaded");

	hookConstructor((props) => !!props?.gameServerStatus, GameInstanceCard, true);
	// hookConstructor((props) => !!props?.getGameServers, RunningGameServers, true);
});
