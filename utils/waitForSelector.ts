export default function waitForSelector(
	selector: Element | string,
	timeout?: string | number,
	_timeout?: number,
): Promise<Element | null> {
	let element;

	if (typeof selector === "string") {
		element = document.querySelector(selector);
	} else if (typeof timeout === "string") {
		element = selector.querySelector(timeout);
		timeout = _timeout;
	}

	if (element) return Promise.resolve(element);

	return new Promise((resolve) => {
		let timer = 0;
		const intervalId = setInterval(() => {
			timer += 100;
			if (typeof selector === "string") {
				element = document.querySelector(selector);
			} else if (typeof timeout === "string") {
				element = selector.querySelector(timeout);
			}

			if (element) {
				clearInterval(intervalId);
				resolve(element);
			} else if (timeout && timer >= Number(timeout)) {
				clearInterval(intervalId);
				resolve(null);
			}
		}, 100);
	});
}
