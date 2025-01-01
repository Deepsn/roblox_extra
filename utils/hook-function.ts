export function hookFunction<O extends Record<K, (...args: any) => any>, K extends keyof O>(
	object: O,
	name: K,
	callback: (target: O[K], thisArg: O, argArray: Parameters<O[K]>) => ReturnType<O[K]>,
) {
	const proxy = new Proxy(object[name], {
		apply: callback,
	});
	object[name] = proxy;
	return proxy;
}
