import { hookReact } from "@/utils/react/hooks";
import { waitForObject } from "@/utils/wait-for-object";

export default defineUnlistedScript(async () => {
	await waitForObject(window, "React");

	hookReact();

	console.log("disabled warning");
	Roblox.DeveloperConsoleWarning.showWarning = () => {};
});
