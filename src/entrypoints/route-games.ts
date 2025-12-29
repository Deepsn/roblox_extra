import innerText from "react-innertext";
import { RunningGameServers } from "@/components/games/running-game-servers";
import { ServerListSection } from "@/components/games/server-list";
import { waitForBundle } from "@/utils/bundle/wait-for-bundle";
import { hookConstructor } from "@/utils/react/hook-constructor";

export default defineUnlistedScript(async () => {
	await waitForBundle("React");

	hookConstructor((props) => !!props?.loadMoreGameInstances, ServerListSection, true);
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
