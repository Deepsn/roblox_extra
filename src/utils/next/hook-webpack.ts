import type { ModuleExports, ModuleFactory } from "@vencord/discord-types/webpack";
import { effect, signal, trigger } from "alien-signals";
import { Logger } from "@/utils/helpers/logger";

const logger = new Logger("Webpack");

const mappedModules = signal(new Map<PropertyKey, ModuleExports>());

export async function hookWebpack() {
	const chunks = await waitForObject(window, "webpackChunk_N_E");

	const hookChunk = (modules: Record<PropertyKey, ModuleFactory>, chunkId: string) => {
		for (const id of Object.keys(modules)) {
			hookFunction(modules, id, (target, thisArg, args) => {
				const result = Reflect.apply(target, thisArg, args);
				const moduleExports = args[0].exports;
				logger.debug(`Registered webpack chunk: ${chunkId}:${id}`, moduleExports);
				mappedModules().set(id, moduleExports);
				trigger(mappedModules);
				return result;
			});
		}
	};

	const addChunks = (chunks: any[]) => {
		for (const [chunkId, modules] of chunks) {
			hookChunk(modules, chunkId);
		}
	};

	hookFunction(chunks, "push", (target, thisArg, args) => {
		addChunks(args);
		return Reflect.apply(target, thisArg, args);
	});

	addChunks(chunks);
}

export function hookChunk(
	filter: (module: ModuleExports, id: PropertyKey) => boolean,
	callback: (module: ModuleExports, id: PropertyKey) => void,
) {
	let dispose: () => void;

	dispose = effect(() => {
		let found = false;
		for (const [id, moduleExports] of mappedModules()) {
			if (filter(moduleExports, id)) {
				found = true;
				callback(moduleExports, id);
			}
		}
		if (found) {
			dispose();
		}
	});

	return dispose;
}
