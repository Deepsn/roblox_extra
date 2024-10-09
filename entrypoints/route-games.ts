import { GameInstanceCard } from "@/components/game-instance-card";
import { GameListSection } from "@/components/game-list-section";
import { RunningGameServers } from "@/components/running-game-servers";
import { ServerListOptions } from "@/components/server-list-options";
import { hookConstructor } from "@/utils/react/hook-constructor";

export default defineUnlistedScript(async () => {
	console.log("loading react");

	await waitForObject(window, "React");

	console.log("react loaded");

	hookConstructor((props) => !!props?.gameServerStatus, GameInstanceCard, true);
	hookConstructor(
		(props) => !!props?.loadMoreGameInstances,
		GameListSection,
		true,
	);
	hookConstructor(
		(props) =>
			(props &&
				"options" in props &&
				"setOptions" in props &&
				"isLoading" in props) ||
			false,
		ServerListOptions,
		true,
	);
	hookConstructor((props) => !!props?.getGameServers, RunningGameServers, true);
});
