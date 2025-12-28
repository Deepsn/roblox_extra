import innerText from "react-innertext";
import { GameListSection } from "@/components/game-list-section";
import { RunningGameServers } from "@/components/running-game-servers";
import { waitForBundle } from "@/utils/bundle/wait-for-bundle";
import { hookConstructor } from "@/utils/react/hook-constructor";

export default defineUnlistedScript(async () => {
	await waitForBundle("React");

	hookConstructor((props) => !!props?.loadMoreGameInstances, GameListSection);
	hookConstructor((props) => !!props?.getGameServers, RunningGameServers, true);

	// Remove download prompt
	hookConstructor(
		(props) => !!props?.download && !!props?.launchGame && !!props?.unmount,
		(element, props) => {
			if (innerText(element).includes("Download Roblox")) {
				props.unmount();
			}

			return element;
		},
	);
});
