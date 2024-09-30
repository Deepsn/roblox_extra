import { hookReact } from "@/utils/react/hooks";
import { waitForObject } from "@/utils/wait-for-object";

export default defineUnlistedScript(async () => {
	// Setups RobloxExtra global, used for sharing context between scripts
	window.RobloxExtra = {
		ReactRegistry: {
			ConstructorsHooks: [],
		},
	};

	await waitForObject(window, "React");

	hookReact();

	console.log("disabled warning");
	Roblox.DeveloperConsoleWarning.showWarning = () => {};
});
