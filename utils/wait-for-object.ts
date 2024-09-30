export function waitForObject<T, K extends keyof T>(
	object: T,
	objectName: K,
): Promise<T[K]> {
	return new Promise((resolve) => {
		if (object[objectName]) {
			return resolve(object[objectName]);
		}

		const watcher = setInterval(() => {
			if (object[objectName]) {
				clearInterval(watcher);
				resolve(object[objectName]);
			}
		}, 100);
	});
}
