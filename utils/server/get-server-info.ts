export async function getServerInfo(placeId: string, gameId: string) {
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

	return json;
}
