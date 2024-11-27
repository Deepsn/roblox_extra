import { DefaultPlayButton } from "@/components/default-play-button";
import { GameListSection } from "@/components/game-list-section";
import { RunningGameServers } from "@/components/running-game-servers";
import { hookConstructor } from "@/utils/react/hook-constructor";

export default defineUnlistedScript(async () => {
	await waitForObject(window, "React");

	hookConstructor((props) => !!props?.loadMoreGameInstances, GameListSection);
	hookConstructor((props) => !!props?.getGameServers, RunningGameServers, true);
	hookConstructor((props) => !!props?.playabilityStatus, DefaultPlayButton);
});
