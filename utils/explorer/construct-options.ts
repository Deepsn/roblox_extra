import { workspaceFile } from "@/utils/explorer/load-file-system";
import type { IWorkbenchConstructionOptions } from "vscode/services";

export const constructOptions: IWorkbenchConstructionOptions = {
	workspaceProvider: {
		trusted: true,
		open: async () => false,
		workspace: {
			workspaceUri: workspaceFile,
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
