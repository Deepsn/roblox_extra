import type React from "react";
import type { Attributes } from "react";

type ReactProps<P = Record<string, unknown>> = (Attributes & P) | null;

export interface ConstructorHook {
	index: number;
	filter: (props: ReactProps) => boolean;
	callback: (...args: any[]) => React.ReactElement | unknown | undefined;
	manipulateResult?: boolean;
}
