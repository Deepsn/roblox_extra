export function hookFunction(
	object: any,
	name: string,
	callback: (...any: any[]) => any,
) {
	const proxy = new Proxy(object[name], {
		apply: callback,
	});
	object[name] = proxy;
	return proxy;
}
