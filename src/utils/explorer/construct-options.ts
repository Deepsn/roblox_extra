import { workspaceUri } from "@/utils/explorer/file-system";
import type { IWorkbenchConstructionOptions } from "vscode/services";

export const constructOptions: IWorkbenchConstructionOptions = {
	workspaceProvider: {
		trusted: true,
		open: async () => false,
		workspace: {
			workspaceUri,
		},
	},
	configurationDefaults: {
		"window.title": "Explorer",
	},
	defaultLayout: {
		views: [
			{
				id: "explorer",
			},
		],
		force: true,
	},
};
