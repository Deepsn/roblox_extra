import { hookBundles } from "@/utils/bundle/hook-bundles";
import { waitForBundle } from "@/utils/bundle/wait-for-bundle";
import { disableDevtoolsWarning } from "@/utils/features/disable-devtools-warning";
import { Logger, lockConsole } from "@/utils/helpers/logger";
import { setupRobloxExtra } from "@/utils/helpers/roblox-extra";
import { hookReact } from "@/utils/react/hook-react";
import { linkReactUtils } from "@/utils/react/link-react-utils";

export default defineUnlistedScript(async () => {
	lockConsole();

	// Setups RobloxExtra global, used for sharing context between scripts
	setupRobloxExtra();

	await hookBundles();

	// todo: make this optional on settings
	disableDevtoolsWarning();

	await waitForBundle("React");

	Logger.info("React", "version loaded:", React.version);

	linkReactUtils();
	hookReact();
});
