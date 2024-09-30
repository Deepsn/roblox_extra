import type { ConstructorHook } from "@/utils/react/types/hook";

interface AdvancedFilter {
	allow: string[];
	deny: string[];
}

export function hookConstructor(
	filterSettings: ConstructorHook["filter"] | AdvancedFilter | string[],
	callback: ConstructorHook["callback"],
	manipulateResult?: ConstructorHook["manipulateResult"],
) {
	let filter: ConstructorHook["filter"] | undefined;

	if (Array.isArray(filterSettings)) {
		filter = (props) =>
			filterSettings.find((obj) => props?.[obj] === undefined) === undefined;
	}

	if (
		typeof filterSettings === "object" &&
		"allow" in filterSettings &&
		"deny" in filterSettings
	) {
		filter = (props) => {
			if (filterSettings.allow) {
				if (
					filterSettings.allow.find((obj) => props?.[obj] === undefined) !==
					undefined
				) {
					return false;
				}
			}

			if (filterSettings.deny) {
				if (
					filterSettings.deny.find((obj) => props?.[obj] !== undefined) !==
					undefined
				) {
					return false;
				}
			}

			return true;
		};
	}

	if (!filter && typeof filterSettings !== "object") {
		filter = filterSettings;
	}

	if (!filter) return;

	RobloxExtra.ReactRegistry.ConstructorsHooks.push({
		filter,
		callback,
		manipulateResult,
	});
}
