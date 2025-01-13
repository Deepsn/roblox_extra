import textMateWorker from "@codingame/monaco-vscode-textmate-service-override/worker?worker";
import testEditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";

export function initializeMonacoEnvironment() {
	self.MonacoEnvironment = {
		getWorker(_workerId: string, label: string) {
			if (label === "TextMateWorker") {
				return new textMateWorker();
			}

			return new testEditorWorker();
		},
	};
}
