import type { IStoredWorkspace } from "@codingame/monaco-vscode-configuration-service-override";
import {
	RegisteredFileSystemProvider,
	RegisteredMemoryFile,
	registerFileSystemOverlay,
} from "@codingame/monaco-vscode-files-service-override";
import * as monaco from "monaco-editor";
import * as vscode from "vscode";

export const workspaceFile = monaco.Uri.file("/workspace.code-workspace");

export function loadFileSystem() {
	const fsProvider = new RegisteredFileSystemProvider(false);

	loadDummyFiles(fsProvider);

	registerFileSystemOverlay(1, fsProvider);
}

function loadDummyFiles(provider: RegisteredFileSystemProvider) {
	provider.registerFile(
		new RegisteredMemoryFile(
			vscode.Uri.file("/test/test.js"),
			`// import anotherfile
    let variable = 1
    function inc () {
      variable++
    }
    
    while (variable < 5000) {
      inc()
      console.log('Hello world', variable);
    }`,
		),
	);

	provider.registerFile(
		new RegisteredMemoryFile(
			workspaceFile,
			JSON.stringify(<IStoredWorkspace>{
				folders: [
					{
						path: "/test",
					},
				],
			}),
		),
	);
}
