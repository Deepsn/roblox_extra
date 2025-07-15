interface Roblox {
	CurrentUser: User;
	DeveloperConsoleWarning: {
		showWarning: () => void;
	};
	PlaceLauncher: PlaceLauncher;
	Dialog: Dialog;
	NumberFormatting: {
		abbreviate: (n: number) => number;
		abbreviatedFormat: (n: number) => string;
		commas: (n: number) => string;
	};
	EnvironmentUrls: {
		[
			key:
				| `${string}Api`
				| `${string}Link`
				| `${string}ApiSite`
				| `${string}Url`
				| "domain"
		]: string;
	};
	GameDetail: {
		UniverseId: number;
	};
	GameLauncher: {
		joinGameInstance: (placeId: number, gameId: string) => void;
	};
	browserDoNotTrack: boolean;
	BundleVerifierConstants: {
		isMetricApiEnabled: boolean;
	};
	BundleDetector: {
		jsBundlesLoaded: { [K: string]: boolean };
	};
	ui: WebBlox;
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
