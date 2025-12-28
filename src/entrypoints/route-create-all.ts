import { hookReact } from "@/utils/next/hook-react";
import { hookWebpack } from "@/utils/next/hook-webpack";

export default defineUnlistedScript(async () => {
	await hookWebpack();
	hookReact();
});
