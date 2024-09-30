import type React from "react";
import type { Attributes } from "react";

type ReactProps<P extends {}> = (Attributes & P) | null;

interface ConstructorHook {
	filter: <P extends { [key: string]: unknown }>(
		props: ReactProps<P>,
		type: FunctionComponent<P>,
		...children: React.ReactNode[]
	) => boolean;
	callback: (
		originalElement: React.ReactElement,
		props: ReactProps<{ [key: string | unknown]: unknown }>,
	) => React.ReactElement | undefined | unknown | undefined;
	manipulateResult?: boolean;
}
