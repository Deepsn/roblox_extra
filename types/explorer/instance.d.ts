export type InstanceTypes = "instance" | "luacontainer";

export interface Instance {
	name: string;
	type: InstanceTypes;

	children?: Instance[];
}
