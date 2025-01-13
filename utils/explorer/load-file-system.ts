import type { IStoredWorkspace } from "@codingame/monaco-vscode-configuration-service-override";
import {
	RegisteredFileSystemProvider,
	RegisteredMemoryFile,
	registerFileSystemOverlay,
} from "@codingame/monaco-vscode-files-service-override";
import * as monaco from "monaco-editor";
import * as vscode from "vscode";

export const workspaceFile = monaco.Uri.file("/workspace");

export function loadFileSystem() {
	const fsProvider = new RegisteredFileSystemProvider(false);

	loadDummyFiles(fsProvider);
	registerFileSystemOverlay(1, fsProvider);

	return fsProvider;
}

function loadDummyFiles(provider: RegisteredFileSystemProvider) {
	provider.registerFile(
		new RegisteredMemoryFile(
			vscode.Uri.file("/asset/test.luau"),
			`local test = 123
print(test + 321)
print(math.huge)`,
		),
	);

	provider.registerFile(
		new RegisteredMemoryFile(
			workspaceFile,
			JSON.stringify(<IStoredWorkspace>{
				folders: [
					{
						path: "/asset",
					},
				],
			}),
		),
	);
}
