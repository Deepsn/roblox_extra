export interface ServerRegion {
	country: string;
	location: string;
}

export interface ServerRegionProtocol {
	getServerRegion(data: { placeId: string; gameId: string }):
		| ServerRegion
		| undefined;
}
