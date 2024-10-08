import { onMessage } from "@/utils/messaging";
import { getServerInfo } from "@/utils/server/get-server-info";
import { getServerRegion } from "@/utils/server/get-server-region";

let userAgentTimeout: NodeJS.Timeout | undefined;

function updateUserAgent() {
	const ruleId = 7548;

	if (!userAgentTimeout) {
		browser.declarativeNetRequest.updateSessionRules({
			removeRuleIds: [ruleId],
			addRules: [
				{
					action: {
						type: "modifyHeaders",
						requestHeaders: [
							{
								header: "user-agent",
								operation: "set",
								value: "Roblox/WinInet",
							},
						],
					},
					condition: {
						requestMethods: ["post"],
						urlFilter: "https://gamejoin.roblox.com/v1/join-game-instance",
						initiatorDomains: [browser.runtime.id],
					},
					id: ruleId,
				},
			],
		});
	}

	if (userAgentTimeout) clearTimeout(userAgentTimeout);

	userAgentTimeout = setTimeout(() => {
		userAgentTimeout = undefined;
		browser.declarativeNetRequest.updateSessionRules({
			removeRuleIds: [ruleId],
		});
	}, 5000);
}

export default defineBackground(() => {
	onMessage("getServerRegion", async (message) => {
		updateUserAgent();

		const { placeId, gameId } = message.data;
		const serverInfo = await getServerInfo(placeId, gameId);

		const address =
			serverInfo?.joinScript?.UdmuxEndpoints?.[0]?.Address ??
			serverInfo?.joinScript?.MachineAddress;
		const region = await getServerRegion(address);

		if (!address) {
			console.log(serverInfo);
		}

		return {
			ip: address,
			region,
		};
	});
});
