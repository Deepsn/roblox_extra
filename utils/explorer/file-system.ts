import type { Instance } from "@/utils/explorer/instance";
import type { IStoredWorkspace } from "@codingame/monaco-vscode-configuration-service-override";
import {
	RegisteredFileSystemProvider,
	RegisteredMemoryFile,
	registerFileSystemOverlay,
} from "@codingame/monaco-vscode-files-service-override";
import * as monaco from "monaco-editor";
import * as vscode from "vscode";

export const assetFolderPath = "/asset";
export const workspaceUri = monaco.Uri.file("/workspace");

export function loadFileSystem() {
	const fsProvider = new RegisteredFileSystemProvider(false);
	registerFileSystemOverlay(1, fsProvider);

	fsProvider.registerFile(
		new RegisteredMemoryFile(
			workspaceUri,
			JSON.stringify(<IStoredWorkspace>{
				folders: [
					{
						path: assetFolderPath,
					},
				],
			}),
		),
	);

	return fsProvider;
}

export async function loadInstancesOnFileSystem(filesystem: RegisteredFileSystemProvider, assetInstance: Instance) {
	function recursiveLoad(instance: Instance) {
		const uri = instance.getUri();
		let contents: string | undefined;

		if (instance.source) {
			contents = instance.source;
		} else {
			if (instance.name !== "root" && instance.children.size === 0) {
				contents = "unsupported";
			}
		}

		if (contents) {
			filesystem.registerFile(new RegisteredMemoryFile(uri, contents));
		}

		if (instance.children) {
			for (const child of instance.children) {
				recursiveLoad(child);
			}
		}
	}

	recursiveLoad(assetInstance);
}
