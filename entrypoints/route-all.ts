import { waitForObject } from "@/utils/waitForObject";

export default defineUnlistedScript(async () => {
	await waitForObject(window, "React");

	console.log("disabled warning");
	Roblox.DeveloperConsoleWarning.showWarning = () => {};
});
