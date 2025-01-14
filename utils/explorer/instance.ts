import { assetFolderPath } from "@/utils/explorer/file-system";
import * as vscode from "vscode";

type InstanceTypes = "instance" | "luacontainer";

export interface InstanceData {
	name: string;

	source?: string;
	children?: InstanceData[];
}

export class Instance {
	public name: string;

	public source?: string;
	public parent?: Instance;
	public children = new Set<Instance>();

	constructor(data: InstanceData) {
		this.name = data.name;
		this.source = data.source;

		for (const child of data.children ?? []) {
			const childInstance = new Instance(child);
			childInstance.parent = this;
			this.children.add(childInstance);
		}
	}

	public getFileType() {
		if (this.source) return ".luau";
		return "";
	}

	public getUri() {
		return vscode.Uri.file(`${assetFolderPath}/${this.getFullPath()}${this.getFileType()}`);
	}

	public getFullPath(): string {
		if (this.parent) {
			return `${this.parent.getFullPath()}/${this.name}`;
		}
		return this.name;
	}
}
