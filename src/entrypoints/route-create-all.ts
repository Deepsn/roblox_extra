import { hookNextReact } from "@/entrypoints/routes/create/hook-next-react";
import { hookObjectDefine } from "@/utils/hook-object-define";
import { hookNext } from "@/utils/next/hook-next";

export default defineUnlistedScript(async () => {
	// Get MUI components using MenuItem
	hookObjectDefine("MenuItem", (obj) => {
		RobloxExtra.MUIRegistry.Components = obj;
	});
	hookNextReact();
	await hookNext();
});
