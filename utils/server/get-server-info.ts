import { storage } from "wxt/storage";

const LIFETIME_IN_MS = 5 * 60 * 60 * 1000; // 5 hours in ms

function convertToKey(placeId: string, gameId: string): `local:${string}` {
	return `local:${placeId}${gameId}_serverinfo`;
}

async function getFromCache(key: `local:${string}`) {
	const clear = async () => await storage.removeItem(key);

	const [value, meta] = await Promise.all([
		storage.getItem(key, { fallback: "" }),
		storage.getMeta<{ timestamp: number }>(key),
	]);

	if (!value || !meta?.timestamp) return await clear();

	if (meta.timestamp + LIFETIME_IN_MS < Date.now()) {
		await clear();
		return;
	}

	let parsed = undefined;

	try {
		parsed = JSON.parse(value);
	} catch (err) {
		console.log("Err parsing json", err);
		await clear();
	}

	return parsed;
}

async function saveToCache(key: `local:${string}`, value: unknown) {
	await storage.setItem(key, JSON.stringify(value));
	await storage.setMeta(key, { timestamp: Date.now() });
}

export async function getServerInfo(placeId: string, gameId: string) {
	const key = convertToKey(placeId, gameId);
	const serverInfoFromCache = await getFromCache(key);

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
	await saveToCache(key, json);

	return json;
}
