import type React from "react";
import type { Attributes } from "react";

type ReactProps<P extends {}> = (Attributes & P) | null;

export interface ConstructorHook {
	filter: <P extends { [key: string]: unknown }>(
		props: ReactProps<P>,
		type: FunctionComponent<P>,
		...children: React.ReactNode[]
	) => boolean;
	callback: (
		...args: any[]
	) => React.ReactElement | undefined | unknown | undefined;
	manipulateResult?: boolean;
}
