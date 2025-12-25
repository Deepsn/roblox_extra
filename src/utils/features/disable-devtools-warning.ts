import { waitForBundle } from "@/utils/bundle/wait-for-bundle";

export async function disableDevtoolsWarning() {
	await waitForBundle("leanbase");
	Roblox.DeveloperConsoleWarning = { showWarning: () => {} };
}
