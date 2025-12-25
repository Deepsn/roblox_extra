interface PlaceLauncher {
	Resources: {
		RefactorEnabled: string;
		IsProtocolHandlerBaseUrlParamEnabled: string;
		ProtocolHandlerAreYouInstalled: {
			play: {
				content: string;
				buttonText: string;
				footerContent: string;
			};
			studio: {
				content: string;
				buttonText: string;
			};
		};
		ProtocolHandlerStartingDialog: {
			play: {
				content: string;
			};
			studio: {
				content: string;
			};
			loader: string;
		};
	};
}
