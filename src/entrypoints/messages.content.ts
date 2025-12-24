import { sendMessage } from "@/utils/messaging";
import { onMessagesFromInjected } from "@/utils/messaging/injected";

export default defineContentScript({
	matches: ["*://*.roblox.com/*"],
	excludeMatches: ["*://*/userads/*", "*://*/user-sponsorship/*", "*://*/build/upload"],
	main(ctx) {
		onMessagesFromInjected("getServerRegion", ({ placeId, gameId }) => {
			return sendMessage("getServerRegion", { placeId, gameId });
		});

		onMessagesFromInjected("createExplorerTab", (data) => {
			return sendMessage("createExplorerTab", data);
		});
	},
});
