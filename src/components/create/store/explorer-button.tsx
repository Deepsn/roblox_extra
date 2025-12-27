import { sendMessagesOnInjected } from "@/utils/messaging/injected";

interface ExplorerProps {
	assetId: number;
	assetName: string;
	assetTypeId: number;
	showDeleteSnackbar: boolean;
	creator: unknown;
	fiatProduct: unknown;
}

export function ExplorerButton({ assetId }: ExplorerProps) {
	async function handleExplorerClick() {
		console.log("clicked", assetId);
		sendMessagesOnInjected("createExplorerTab", assetId);
	}

	return (
		<button type="button" onClick={handleExplorerClick} style={{ margin: "0 12px 0 0", padding: "12px" }}>
			TEST {assetId}
		</button>
	);
}
