export function waitForObject<T, K extends keyof T>(object: T, objectName: K): Promise<T[K]> {
	return new Promise((resolve) => {
		if (object[objectName]) {
			return resolve(object[objectName]);
		}

		const lastHandler = Object.getOwnPropertyDescriptor(object, objectName);

		Object.defineProperty(object, objectName, {
			enumerable: false,
			configurable: true,
			set: (value) => {
				delete object[objectName];
				if (lastHandler) {
					// Return the original handler
					Object.defineProperty(object, objectName, lastHandler);
				}
				resolve(value);
				object[objectName] = value;
			},
		});
	});
}
