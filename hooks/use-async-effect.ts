/**
 * Runs an async effect
 * @param effect The async effect to run.
 * @param deps The dependencies to run the effect on.
 */
export function useAsyncEffect(effect: () => Promise<any>, deps?: unknown[]) {
	useEffect(() => {
		effect();
	}, deps);
}
