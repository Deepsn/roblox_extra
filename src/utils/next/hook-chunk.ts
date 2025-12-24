import type { Chunk, ChunkHook } from "@/utils/next/types/chunk-hook";
import { watchChanges } from "@/utils/watch-changes";

export function hookChunk(filter: ChunkHook["filter"], callback: ChunkHook["callback"]) {
	const chunkCache = new WeakSet<Chunk>();
	const onChunk = (chunk: Chunk) => {
		if (chunkCache.has(chunk)) return;
		chunkCache.add(chunk);
		if (!filter(chunk)) return;

		callback(chunk);
	};

	RobloxExtra.WebpackRegistry.Chunks = watchChanges(RobloxExtra.WebpackRegistry.Chunks, (changed) => {
		if (typeof changed !== "object") return;
		onChunk(changed);
	});

	for (const chunk of RobloxExtra.WebpackRegistry.Chunks) {
		onChunk(chunk);
	}
}
