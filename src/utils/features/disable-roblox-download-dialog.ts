export function disableRobloxDownloadDialog() {
	const {
		ui: { Dialog },
	} = Roblox;

	Dialog.render = new Proxy(Dialog.render, {
		apply(target, thisArg, args) {
			const [props] = args;

			const text = props.children.props.inputMessage?.props?.children as string | undefined;

			if (typeof text === "string" && text.includes("Download")) {
				props.open = false;
			}

			return Reflect.apply(target, thisArg, args);
		},
	});
}
