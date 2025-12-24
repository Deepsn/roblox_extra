import type { Instance } from "@/utils/explorer/instance";
import type { IStoredWorkspace } from "@codingame/monaco-vscode-configuration-service-override";
import {
	RegisteredFileSystemProvider,
	RegisteredMemoryFile,
	registerFileSystemOverlay,
} from "@codingame/monaco-vscode-files-service-override";
import * as monaco from "monaco-editor";

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
	async function recursiveLoad(instance: Instance) {
		const uri = instance.getUri();
		let contents: string | undefined;

		if (instance.properties.has("Source")) {
			contents = instance.properties.get("Source") as string;
		} else if (instance.children.size === 0) {
			contents = "unsupported";
		}

		if (contents) {
			try {
				filesystem.registerFile(new RegisteredMemoryFile(uri, contents));
			} catch (error) {
				if (error instanceof Error && error.message.includes("already exists")) {
					console.log("Duplicated file", uri.toString());
					instance.properties.set("Name", `${instance.properties.get("Name")} (${instance.properties.get("Ref")})`);
					recursiveLoad(instance);
				}
			}
		}

		if (instance.children) {
			for (const child of instance.children) {
				recursiveLoad(child);
			}
		}
	}

	await recursiveLoad(assetInstance);
}
