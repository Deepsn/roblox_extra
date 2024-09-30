export function waitForObject<T, K extends keyof T>(
	object: T,
	objectName: K,
): Promise<T[K]> {
	return new Promise((resolve) => {
		if (object[objectName]) {
			return resolve(object[objectName]);
		}

		Object.defineProperty(object, objectName, {
			configurable: true,
			enumerable: false,
			set(newValue) {
				delete object[objectName];
				object[objectName] = newValue;
				resolve(newValue);
			},
		});
	});
}
