import { hookNextReact } from "@/entrypoints/routes/create/hook-next-react";
import { hookNext } from "@/utils/next/hook-next";

export default defineUnlistedScript(async () => {
	hookNextReact();
	await hookNext();
});
