import { hookBundles } from "@/utils/bundle/hook-bundles";
import { waitForBundle } from "@/utils/bundle/wait-for-bundle";
import { disableDevtoolsWarning } from "@/utils/features/disable-devtools-warning";
import { linkReactUtils } from "@/utils/features/link-react-utils";
import { hookReact } from "@/utils/react/hook-react";

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
		JSBundleCallbacks: new Map<string, Set<() => void>>(),
	};

	await hookBundles();

	// todo: make this optional on settings
	disableDevtoolsWarning();

	await waitForBundle("React");

	linkReactUtils();
	hookReact();
});
