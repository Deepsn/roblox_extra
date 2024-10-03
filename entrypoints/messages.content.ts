import { sendMessage } from "@/utils/messaging";
import { onMessagesFromInjected } from "@/utils/messaging/injected";

export default defineContentScript({
	matches: ["*://*.roblox.com/*"],
	excludeMatches: [
		"*://*/userads/*",
		"*://*/user-sponsorship/*",
		"*://*/build/upload",
	],
	main(ctx) {
		onMessagesFromInjected("getServerInfo", ({ placeId, gameId }) => {
			return sendMessage("getServerInfo", { placeId, gameId });
		});
	},
});
