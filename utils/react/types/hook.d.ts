import type React from "react";
import type { Attributes } from "react";

type ReactProps<P extends {}> = (Attributes & P) | null;

export interface ConstructorHook {
	index: string | number;
	filter: <P extends { [key: string]: unknown }>(props: ReactProps<P>, type: FunctionComponent<P>) => boolean;
	callback: (...args: any[]) => React.ReactElement | unknown | undefined;
	manipulateResult?: boolean;
}
