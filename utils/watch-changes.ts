export function watchChanges(object: object, callback: (value: any) => void) {
	const handler = {
		set(target: any, property: string, value: any) {
			target[property] = value;
			callback(value);
			return true;
		},
	};

	return new Proxy(object, handler);
}
