import { hookConstructor } from "@/utils/react/hook-constructor";

export default defineUnlistedScript(async () => {
	console.log("stores");

	hookConstructor(
		(props, render) => {
			console.log("react element", props, render.name);
			return false;
		},
		() => {},
	);
});
