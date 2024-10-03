import { onMessage } from "@/utils/messaging";
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
	onMessage("getServerInfo", async (message) => {
		updateUserAgent();

		const { placeId, gameId } = message.data;

		const response = await fetch(
			"https://gamejoin.roblox.com/v1/join-game-instance",
			{
				method: "POST",
				headers: {
					"content-type": "application/json",
					"user-agent": "Roblox/WinInet",
				},
				body: JSON.stringify({ placeId, gameId }),
			},
		);

		const success = response.headers.has("Vary");
		if (!success) return undefined;

		const json = await response.json();
		const address = json?.joinScript?.UdmuxEndpoints?.[0]?.Address;
		const region = await getServerRegion(address);

		return {
			ip: address,
			region,
		};
	});
});
