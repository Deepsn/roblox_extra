import { storage } from "wxt/storage";

interface ServerInfo {
	machineAddress: string;
}

const LIFETIME_IN_MS = 15 * 60 * 1000; // 15 minutes in ms

async function getFromCache(placeId: string, gameId: string) {
	const instances = await storage.getItem<{
		[gameId: string]: ServerInfo & { timestamp: number };
	}>(`local:${placeId}`);

	if (!instances) {
		await storage.setItem(`local:${placeId}`, {});
		return;
	}

	const now = Date.now();
	const instance = instances[gameId];

	if (instance && now > instance.timestamp) {
		delete instances[gameId];
		await storage.setItem(`local:${placeId}`, instances);
		return;
	}

	return instance;
}

async function saveToCache(placeId: string, gameId: string, value: ServerInfo) {
	const instances =
		(await storage.getItem<{
			[gameId: string]: ServerInfo & { timestamp: number };
		}>(`local:${placeId}`)) ?? {};

	instances[gameId] = { ...value, timestamp: Date.now() + LIFETIME_IN_MS };

	await storage.setItem(`local:${placeId}`, instances);
}

export async function getServerInfo(
	placeId: string,
	gameId: string,
): Promise<ServerInfo | undefined> {
	const serverInfoFromCache = await getFromCache(placeId, gameId);

	if (serverInfoFromCache) {
		return serverInfoFromCache;
	}

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
	if (!success) return;

	const json = await response.json();
	const machineAddress =
		json?.joinScript?.UdmuxEndpoints?.[0]?.Address ??
		json?.joinScript?.MachineAddress;
	if (!machineAddress) return;

	const serverInfo = {
		machineAddress,
	} as ServerInfo;

	saveToCache(placeId, gameId, serverInfo);

	return serverInfo;
}

setInterval(async () => {
	const places = await storage.snapshot("local");

	for (const placeId in places) {
		const now = Date.now();
		const instances = places[placeId] as {
			[gameId: string]: ServerInfo & { timestamp: number };
		};

		for (const gameId in instances) {
			const instance = instances[gameId];

			if (now > instance.timestamp) {
				console.log(`removing ${gameId}`);
				delete instances[gameId];
			}
		}

		if (Object.keys(instances).length === 0) {
			await storage.removeItem(`local:${placeId}`);
		} else {
			await storage.setItem(`local:${placeId}`, instances);
		}
	}
}, LIFETIME_IN_MS - 1);
