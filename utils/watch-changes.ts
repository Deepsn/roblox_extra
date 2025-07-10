export function watchChanges(
	object: object,
	callback: (value: any, property: string) => void,
) {
	const handler = {
		set(target: any, property: string, value: any) {
			target[property] = value;
			callback(value, property);
			return true;
		},
	};

	return new Proxy(object, handler);
}
