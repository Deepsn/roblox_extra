export function disableDevtoolsWarning() {
	Roblox.DeveloperConsoleWarning = { showWarning: () => {} };
}
