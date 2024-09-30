export default function waitForSelector(
	selector: Element | string,
	timeout?: string | number,
	_timeout?: number,
): Promise<Element | null> {
	return new Promise((resolve) => {
		let element: Element | null = null;
		let timer = 0;

		const checkSelector = () => {
			if (typeof selector === "string") {
				element = document.querySelector(selector);
			} else {
				element = selector;
			}

			if (element) {
				clearInterval(intervalId);
				resolve(element);
			} else if (timeout && timer >= Number(timeout)) {
				clearInterval(intervalId);
				resolve(null);
			}
		};

		checkSelector();

		const intervalId = setInterval(() => {
			timer += 100;
			checkSelector();
		}, 100);
	});
}
