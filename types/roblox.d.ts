interface Roblox {
	CurrentUser: User;
	DeveloperConsoleWarning: {
		showWarning: () => void;
	};
	NumberFormatting: {
		abbreviate: (n: number) => number;
		abbreviatedFormat: (n: number) => string;
		commas: (n: number) => string;
	};
	EnvironmentUrls: {
		[key: string]:
			| `${string}Api`
			| `${string}Link`
			| `${string}ApiSite`
			| `${string}Url`
			| "domain";
	};
	GameDetail: {
		UniverseId: number;
	};
}

interface User {
	displayName: string;
	hasVerifiedBadge: boolean;
	is13orOver: boolean;
	isAuthenticated: boolean;
	isPremiumUser: boolean;
	isUnder13: boolean;
	name: string;
	userId: string;
}
