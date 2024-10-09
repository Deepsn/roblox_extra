export interface GamePlayer {
	id: string | null;
	name: string | null;
	playerToken: string;
	displayName: string | null;
}

export interface ServerInstance {
	[key: string]: unknown;
	id: string;
	fps: number;
	players: GamePlayer[];
	playing: number;
	ping: number;
	maxPlayers: number;
	playerTokens: string[];
}

export interface Options {
	excludeFullGames: boolean;
	sortOrder: "Desc" | "Asc";
	selectedRegion: string | undefined;
	limit: string;
	maxPlayers: number;
}

export type ServerCursor = string | undefined;
