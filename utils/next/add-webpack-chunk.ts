import type { Chunk, Module } from "@/utils/next/types/chunk-hook";

const moduleCache = new WeakSet<Module["exports"]>();

export function addWebpackChunk(chunk: Chunk) {
	for (const id of Object.keys(chunk)) {
		hookFunction(chunk, id, (target, thisArg, args) => {
			const result = Reflect.apply(target, thisArg, args);
			const moduleExports = args[0].exports;

			if (typeof moduleExports === "object" && !moduleCache.has(moduleExports)) {
				moduleCache.add(moduleExports);
				RobloxExtra.WebpackRegistry.Chunks.push(moduleExports);
			}

			return result;
		});
	}
}
