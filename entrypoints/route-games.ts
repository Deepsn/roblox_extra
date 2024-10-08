import { GameInstanceCard } from "@/components/game-instance-card";
import { GameListSection } from "@/components/game-list-section";
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
	// hookConstructor((props) => !!props?.getGameServers, RunningGameServers, true);
});
