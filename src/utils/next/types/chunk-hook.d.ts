export interface Module {
	exports: any;
}

export type Chunk = Record<string, (...args: [Module]) => any>;
//  {
// 	[id: string]: (...args: [Module]) => any;
// }

export interface ChunkHook {
	filter: (chunk: Chunk) => boolean;
	callback: (chunk: Chunk) => void;
}
