import { disableDevtoolsWarning } from "@/utils/features/disable-devtools-warning";
import { linkReactUtils } from "@/utils/features/link-react-utils";
import { hookReact } from "@/utils/react/hook-react";
import { waitForObject } from "@/utils/wait-for-object";

export default defineUnlistedScript(async () => {
	// Setups RobloxExtra global, used for sharing context between scripts
	window.RobloxExtra = {
		ReactRegistry: {
			ConstructorsHooks: [],
		},
		WebpackRegistry: {
			Chunks: [],
		},
	};

	await waitForObject(window, "Roblox");

	disableDevtoolsWarning();

	await waitForObject(window, "React");

	linkReactUtils();

	// React style guide
	await waitForObject(window, "ReactStyleGuide");

	hookReact();
});
