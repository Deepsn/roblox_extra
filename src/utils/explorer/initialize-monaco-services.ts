import getConfigurationServiceOverride from "@codingame/monaco-vscode-configuration-service-override";
import getExplorerServiceOverride from "@codingame/monaco-vscode-explorer-service-override";
import getExtensionGalleryServiceOverride from "@codingame/monaco-vscode-extension-gallery-service-override";
import getLanguagesServiceOverride from "@codingame/monaco-vscode-languages-service-override";
import getPreferencesServiceOverride from "@codingame/monaco-vscode-preferences-service-override";
import getTextMateServiceOverride from "@codingame/monaco-vscode-textmate-service-override";
import getThemeServiceOverride from "@codingame/monaco-vscode-theme-service-override";
import getWorkbenchServiceOverride from "@codingame/monaco-vscode-workbench-service-override";

import { initialize as initializeServices } from "vscode/services";

import { constructOptions } from "@/utils/explorer/construct-options";
import type * as monaco from "monaco-editor";

export async function initializeMonacoServices(container: HTMLElement) {
	const services: monaco.editor.IEditorOverrideServices = {
		...getTextMateServiceOverride(),
		...getThemeServiceOverride(),
		...getConfigurationServiceOverride(),

		...getPreferencesServiceOverride(),
		...getLanguagesServiceOverride(),

		...getExplorerServiceOverride(),
		...getExtensionGalleryServiceOverride(),

		...getWorkbenchServiceOverride(),
	};

	await initializeServices(services, container, constructOptions);
}
