interface ServerInfo {
	ip: string;
	region: {
		country: string;
		countryCode: string;
		location: string;
	};
}

export interface ServerInfoProtocol {
	getServerInfo(data: { placeId: string; gameId: string }):
		| ServerInfo
		| undefined;
}