import { hookBundles } from "@/utils/bundle/hook-bundles";
import { waitForBundle } from "@/utils/bundle/wait-for-bundle";
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
			// Will be filled by the MUI hook
			Components: {} as any,
		},
	};

	await hookBundles();

	waitForBundle("leanbase").then(disableDevtoolsWarning);

	await waitForBundle("React");

	linkReactUtils();

	waitForBundle("ReactStyleGuide").then(hookReact);
});
