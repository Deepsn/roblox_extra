export function hookObjectDefine(key: string, callback: (obj: any, value: any) => void) {
	if (!(Object as any).defineProperty.__proxy) {
		Object.defineProperty = new Proxy(Object.defineProperty, {
			apply(target, thisArg, args) {
				const result = Reflect.apply(target, thisArg, args);

				for (const { key, callback } of RobloxExtra.ObjectDefineHooks) {
					if (args[1] === key) {
						callback(args[0], args[1]);
					}
				}

				return result;
			},
			get(target, key, receiver) {
				if (key === "__proxy") {
					return true;
				}
				return Reflect.get(target, key, receiver);
			},
		});
	}

	RobloxExtra.ObjectDefineHooks.push({ key, callback });
}
