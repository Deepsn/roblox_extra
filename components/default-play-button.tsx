import { disableRobloxDownloadDialog } from "@/utils/features/disable-roblox-download-dialog";
import type { ConstructorHook } from "@/utils/react/types/hook";

export const DefaultPlayButton: ConstructorHook["callback"] = (
	element,
	props,
) => {
	useEffect(() => {
		disableRobloxDownloadDialog();
	}, []);

	return element;
};
