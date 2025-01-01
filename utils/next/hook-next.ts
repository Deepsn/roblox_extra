import { addWebpackChunk } from "@/utils/next/add-webpack-chunk";

export async function hookNext() {
	console.log("Hooking Next.js");
	const chunks = await waitForObject(window, "webpackChunk_N_E");

	const addChunks = (chunks: any[]) => {
		for (const chunk of chunks) {
			addWebpackChunk(chunk[1]);
		}
	};

	const hook = (fn: (...args: any[]) => void) => {
		return new Proxy(fn, {
			apply: (target, thisArg, args) => {
				addChunks(args);
				return Reflect.apply(target, thisArg, args);
			},
		});
	};

	let push = hook(chunks.push);

	Object.defineProperty(chunks, "push", {
		enumerable: false,
		configurable: true,
		get: () => push,
		set: (fn) => {
			push = hook(fn);
		},
	});

	addChunks(chunks);
}
