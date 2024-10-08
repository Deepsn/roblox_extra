import { hookReact } from "@/utils/react/hook-react";
import { waitForObject } from "@/utils/wait-for-object";

export default defineUnlistedScript(async () => {
	// Setups RobloxExtra global, used for sharing context between scripts
	window.RobloxExtra = {
		ReactRegistry: {
			ConstructorsHooks: [],
		},
	};

	await waitForObject(window, "Roblox");

	await waitForObject(window, "React");

	console.log("disabled warning");
	Roblox.DeveloperConsoleWarning.showWarning = () => {};

	// React global utils
	const internals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
	const dispatcher = internals.ReactCurrentDispatcher;
	let current = dispatcher.current;

	Object.defineProperty(dispatcher, "current", {
		enumerable: true,
		set(value) {
			current = value;

			if (!value) return;

			const keys = Object.keys(value).filter((key) => key.includes("use"));

			for (const key of keys) {
				if (Reflect.has(window, key)) continue;
				Reflect.set(window, key, (React as any)[key]);
			}
		},
		get() {
			return current;
		},
	});

	// React style guide
	await waitForObject(window, "ReactStyleGuide");

	hookReact();
});
