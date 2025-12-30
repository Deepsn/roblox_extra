import type React from "react";
import type { Dispatch } from "react";

export type createSystemFeedback = () => [() => React.JSX.Element, Dispatch];
