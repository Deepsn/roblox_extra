export function disableRobloxDownloadDialog() {
	const {
		PlaceLauncher: {
			Resources: { ProtocolHandlerAreYouInstalled },
		},
	} = Roblox;

	Roblox.Dialog.open = new Proxy(Roblox.Dialog.open, {
		apply(target, thisArg, args) {
			const [props] = args;
			const body = props.bodyContent as string;

			if (body === ProtocolHandlerAreYouInstalled.play.content) {
				return;
			}

			return target.apply(thisArg, [props]);
		},
	});
}
