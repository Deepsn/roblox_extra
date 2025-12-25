export interface ReactUtilities {
	/**
	 * Return the debounced input value to prevent frequently updated.
	 *
	 * @param value - Value to be debounced
	 * @param {number} delay - Delay of the debounce in ms
	 * @returns the debouned input value based on the given delay
	 */
	useDebounce<V>(value: V, delay: number): V;
}
