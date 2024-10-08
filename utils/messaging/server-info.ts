export interface ServerRegion {
	ip: string;
	region: {
		country: string;
		location: string;
	};
}

export interface ServerInfo {
	[key: string]: unknown;
}

export interface ServerRegionProtocol {
	getServerRegion(data: { placeId: string; gameId: string }):
		| ServerRegion
		| undefined;
}
