import { disableDevtoolsWarning } from "@/utils/features/disable-devtools-warning";
import { linkReactUtils } from "@/utils/features/link-react-utils";
import { hookReact } from "@/utils/react/hook-react";
import { waitForObject } from "@/utils/wait-for-object";

export default defineUnlistedScript(async () => {
	// Setups RobloxExtra global, used for sharing context between scripts
	window.RobloxExtra = {
		ObjectDefineHooks: new Map(),
		ReactRegistry: {
			ConstructorsHooks: [],
		},
		WebpackRegistry: {
			Chunks: [],
		},
		MUIRegistry: {
			Components: {},
		},
	};

	await waitForObject(window, "React");

	console.log("react version loaded:", React.version);
	linkReactUtils();

	await waitForObject(window, "Roblox");

	disableDevtoolsWarning();

	// React style guide
	await waitForObject(window, "ReactStyleGuide");

	hookReact();
});
