import type { ServerInstance } from "@/types/games";

export function getBestPingServers(servers: ServerInstance[]): ServerInstance[] {
	if (servers.length === 0) return servers;

	let totalPing = 0;

	for (const server of servers) {
		totalPing += server.ping;
	}

	const averagePing = totalPing / servers.length;

	return servers
		.filter((server) => {
			return server.ping <= averagePing;
		})
		.toSorted((a, b) => a.ping - b.ping);
}
