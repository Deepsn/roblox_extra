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
	const { MenuItem } = RobloxExtra.MUIRegistry.Components;

	async function handleExplorerClick() {
		console.log("clicked", assetId);
		sendMessagesOnInjected("createExplorerTab", assetId);
	}

	return (
		<MenuItem component={"button"} onClick={handleExplorerClick} style={{ margin: "0 12px 0 0", padding: "12px" }}>
			TEST {assetId}
		</MenuItem>
	);
}
