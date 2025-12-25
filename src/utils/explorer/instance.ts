import * as vscode from "vscode";
import { assetFolderPath } from "@/utils/explorer/file-system";

type InstanceTypes = "instance" | "luacontainer";

export interface InstanceData {
	name: string;
	properties: Map<string, { [key: string]: unknown }>;
	children?: InstanceData[];
	class: string;
	referent: string;
}

export class Instance {
	public properties = new Map<string, unknown>();
	public children = new Set<Instance>();

	public parent?: Instance;

	constructor(data: InstanceData) {
		for (const [key, value] of data.properties.entries()) {
			const valueKey = Object.keys(value)[0];
			this.properties.set(key, value[valueKey]);
		}

		this.properties.set("Name", data.name);
		this.properties.set("ClassName", data.class);
		this.properties.set("Ref", data.referent);

		for (const child of data.children ?? []) {
			const childInstance = new Instance(child);
			childInstance.parent = this;
			this.children.add(childInstance);
		}
	}

	public getFileType() {
		if (this.properties.has("Source")) return ".luau";
		return `.${this.properties.get("ClassName")}`;
	}

	public getUri() {
		return vscode.Uri.file(`${assetFolderPath}/${this.getFullPath()}${this.getFileType()}`);
	}

	public getFullPath(): string {
		const name = this.properties.get("Name") as string;
		if (this.parent) {
			return `${this.parent.getFullPath()}/${name}`;
		}

		return name;
	}
}
